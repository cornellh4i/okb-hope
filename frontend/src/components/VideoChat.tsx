import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../backend/firebase/firebase";
import { collection, doc, addDoc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";


const VideoChat: React.FC = () => {
  const webcamButton = useRef<HTMLButtonElement>(null); /** grabs html elements */
  const callButton = useRef<HTMLButtonElement>(null); /** grabs html elements */
  const answerButton = useRef<HTMLButtonElement>(null); /** grabs html elements */
  const hangupButton = useRef<HTMLButtonElement>(null); /** grabs html elements */
  const toggleAudioButton = useRef<HTMLButtonElement>(null); /** grabs html elements */
  const toggleVideoButton = useRef<HTMLButtonElement>(null); /** grabs html elements */

  const webcamVideo = useRef<HTMLVideoElement>(null); /** grabs html elements */
  const remoteVideo = useRef<HTMLVideoElement>(null); /** grabs html elements */
  const callInput = useRef<HTMLInputElement>(null); /** grabs html elements */

  const [pc, setPC] = useState<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  /**
   * Stun servers used to setup Peer-to-Peer connection
   * URLs chosen below are free provided by Google
   * Allows peer to determine its public facing IP address
   */
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  }; /** generating ice (Interactive Connectivity Establishment) candidates 
  aka, a list of possible IP addresses and ports that a device might use to connect
   to another device.*/

  useEffect(() => {
    setPC(new RTCPeerConnection(servers)); /** creates rtc peer connection*/
  }, [])


  /**
   * Sets up the media sources for a video call by requesting user permission 
   * to access the camera and microphone and creating a new MediaStream object 
   * for the remote stream.
   */
  const setupMediaSources = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }); /** sets event for clicking button, obtains user's stream using getusermedia
    promise will resolve once permission is granted to get audio and video */
    const remoteStream = new MediaStream();
    /** sets up media stream, an empty media stream  */

    stream.getTracks().forEach((track) => {
      pc!.addTrack(track, stream);
    }); /** takes user and media stream and makes available on peer connection,
   as well as showing them in the dom */

    pc!.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    }; /** updates remote stream by peer connection
    do this by listening on the track event on pure connection
    get tracks from stream
    loop over them
    add them to remote stream */

    setLocalStream(stream);
    setRemoteStream(remoteStream);

    if (webcamVideo.current) {
      webcamVideo.current.srcObject = stream;
    } /** applies user stream to video elements in dom */

    if (remoteVideo.current) {
      remoteVideo.current.srcObject = remoteStream;
    }

    if (callButton.current && answerButton.current && webcamButton.current && toggleVideoButton.current && toggleAudioButton.current) {
      callButton.current.disabled = false;
      answerButton.current.disabled = false;
      webcamButton.current.disabled = true;
      toggleAudioButton.current.disabled = false;
      toggleVideoButton.current.disabled = false;
    }
  };

  /**
   * Sets up a WebRTC call by creating a local offer, updating the Firestore database with 
   * the offer, setting up listeners for changes, and adding remote candidates to the 
   * peer connection object. If available, the function enables the hangupButton.
   */
  const createOffer = async () => {
    const callDoc = doc(collection(db, 'calls')); /** manages answer and offer 
    from both users */
    const offerCandidates = collection(callDoc, "offerCandidates");
    /** subcollections under calldoc that contain all cofferCandidates */
    const answerCandidates = collection(callDoc, "answerCandidates");
    /** subcollections under calldoc that contain all answerCandidates */

    if (callInput.current) {
      callInput.current.value = callDoc.id;
    } /** sets firebase generated random id and populate an input in ui */

    pc!.onicecandidate = async (event) => {
      if (event.candidate) {
        await addDoc(offerCandidates, event.candidate.toJSON());
      }
    };

    const offerDescription = await pc!.createOffer(); /** returns offer description */
    await pc!.setLocalDescription(offerDescription); /** sets offer description as
    local description on peer conenction */

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    }; /** sets sdp value to js object */

    await setDoc(callDoc, { offer }); /** call document set with that js object */

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!pc!.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer); /** 
        set answer description on peer connection locally
        listens to database for answer
        once answer is recieved, update that on peer connection */
        pc!.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => { /** when answered, 
    add candidate to peer connection */
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          /** create new ice candidate with document data
           * add candidate to peer connection */
          const candidate = new RTCIceCandidate(change.doc.data());
          pc!.addIceCandidate(candidate);
        }
      });
    });
    if (hangupButton.current) {
      hangupButton.current.disabled = false;
    }
  };

  /**
   * Retrieves the call document from Firestore and the "answerCandidates" and 
   * "offerCandidates" collections within the document.
   * 
   * Gets an offer description, sets it as remote, creates an answer, sets 
   * local description, and updates call document. Sets up a listener for changes. 
   */
  const answerCall = async () => {
    const callId = callInput.current?.value;
    if (!callId) return;

    const callDoc = doc(db, 'calls', callId);
    const answerCandidates = collection(callDoc, 'answerCandidates');
    const offerCandidates = collection(callDoc, 'offerCandidates');

    pc!.onicecandidate = (event) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callDocSnapshot = await getDoc(callDoc);
    const callData = callDocSnapshot.data();

    if (!callData) return;

    const offerDescription = callData.offer;
    await pc!.setRemoteDescription(new RTCSessionDescription(offerDescription));
    /** sets remote description on peer connection */

    //create offer method as local description on peer connection
    // object contains sdp value (session description protocol)
    const answerDescription = await pc!.createAnswer();
    await pc!.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type, // convert to js object
      sdp: answerDescription.sdp, // convert to js object
    };

    await updateDoc(callDoc, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      const changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === 'added') {
          let data = change.doc.data();
          pc!.addIceCandidate(new RTCIceCandidate(data));
        } /** when new ice candidate is added to that collection
        create ice candidate locally */
      });
    });
  };

  /**
   * Closes the peer connection and disables the webcam button. Disables 
   * all the buttons and clears the call input fields. Resets to default values.
   */
  const hangupCall = () => {
    pc!.close();

    if (webcamButton.current) {
      webcamButton.current.disabled = false;
    }

    if (callButton.current && toggleAudioButton.current && answerButton.current && hangupButton.current && toggleVideoButton.current) {
      callButton.current.disabled = true;
      answerButton.current.disabled = true;
      hangupButton.current.disabled = true;
      toggleVideoButton.current.disabled = true;
      toggleAudioButton.current.disabled = true;
    }

    if (callInput.current) {
      callInput.current.value = "";
    }

    setLocalStream(null); /** setting values for local stream (user webcam) */
    setRemoteStream(null); /** setting values for remote stream (other's webcam) */

    if (webcamVideo.current) {
      webcamVideo.current.srcObject = null;
    }

    if (remoteVideo.current) {
      remoteVideo.current.srcObject = null;
    }
  };

  const toggleAudio = () => { /** button for toggling user's outgoing audio */
    // if audio is on
    if (localStream!.getTracks().find(track => track.kind === 'audio')) {
      const audioTrack = localStream!.getAudioTracks()[0];
      localStream!.removeTrack(audioTrack);
    }
    else { /** if audio off */
      localStream!.getTracks().forEach((track) => {
        if (track.kind === 'audio') {
          pc!.addTrack(track, localStream!);
        }
      });
    }
  };

  const toggleVideo = () => { /** button for toggling user's outgoing audio */
    // if video is on
    if (localStream!.getTracks().find(track => track.kind === 'video')) {
      const videoTrack = localStream!.getVideoTracks()[0];
      localStream!.removeTrack(videoTrack);
    }
    else { /** if video is  off */
      localStream!.getTracks().forEach((track) => {
        if (track.kind === 'video') {
          pc!.addTrack(track, localStream!);
        }
      });
    }
  };

  return (
    <div>
      <h1>Video Chat</h1>
      <video ref={webcamVideo} autoPlay muted playsInline></video>
      <video ref={remoteVideo} autoPlay playsInline></video>
      <button ref={webcamButton} onClick={setupMediaSources}>
        Start webcam
      </button>
      <div>
        <input
          ref={callInput}
          type="text"
          placeholder="Call ID"
        />
        <button ref={callButton} onClick={createOffer} disabled>
          Call
        </button>
        <button ref={answerButton} onClick={answerCall} disabled>
          Answer
        </button>
      </div>
      <button ref={hangupButton} onClick={hangupCall} disabled>
        Hangup
      </button>
      <button ref={toggleAudioButton} onClick={toggleAudio} disabled>
        Toggle Audio
      </button>
      <button ref={toggleVideoButton} onClick={toggleVideo} disabled>
        Toggle Video
      </button>
    </div>
  );
};

export default VideoChat;
