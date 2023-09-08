/** eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, doc, addDoc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import Chat from "../assets/chat.svg";
import Audio from "../assets/audio.svg";
import Video from "../assets/video.svg";
import Grid from "../assets/grid.svg";
import Spotlight from "../assets/spotlight.svg";

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
  const [isVideoEnabled, setisVideoEnabled] = useState(false);
  const [isAudioEnabled, setisAudioEnabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);
  const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);
  const [layoutOption, setLayoutOption] = useState('grid'); // 'grid' or 'spotlight'

  console.log(remoteStream);
  console.log(dataChannel);

  // add this component to a new data channel
  useEffect(() => {
    if (pc) {
      const channel = pc.createDataChannel('timer');
      channel.onmessage = (event) => {
        if (event.data === 'start') {
          startTimer(); // starts the timer on the offerer's side
        }
      };
      setDataChannel(channel);
    }
  }, [pc]);

  const callDoc = doc(collection(db, 'calls')); /** manages answer and offer 
  from both users */
  const offerCandidates = collection(callDoc, "offerCandidates");
  /** subcollections under calldoc that contain all cofferCandidates */
  const answerCandidates = collection(callDoc, "answerCandidates");

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
  }, [servers])


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
      if (pc) {
        pc.addTrack(track, stream);

      }
      // making setIsAudioEnabled in the loop means its going to run twice,
      // once for audio,once for video. might be inefficient to call 
      // state updater function twice with same value
      setisAudioEnabled(true);
      setisVideoEnabled(true); // booleans for checking if video on/off
    }); /** takes user and media stream and makes available on peer connection,
   as well as showing them in the dom */
    if (pc) {
      pc.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track);
        });
      };
    }

    /** updates remote stream by peer connection
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
    } /** applies callee's stream to video elements in dom */

    // checks if buttons exist after gaining access to webcam/audio
    if (callButton.current && answerButton.current && webcamButton.current && toggleVideoButton.current && toggleAudioButton.current) {
      callButton.current.disabled = false; // enables buttons
      answerButton.current.disabled = false; // enables buttons
      webcamButton.current.disabled = true; // disables buttons
    }
  };

  /**
   * Sets up a WebRTC call by creating a local offer, updating the Firestore database with 
   * the offer, setting up listeners for changes, and adding remote candidates to the 
   * peer connection object. If available, the function enables the hangupButton.
   */

  const createOffer = async () => {
    if (callInput.current) {
      callInput.current.value = callDoc.id;
    } /** sets firebase generated random id and populate an input in ui */

    if (pc) {
      pc.onicecandidate = async (event) => {
        if (event.candidate) {
          await addDoc(offerCandidates, event.candidate.toJSON());
        }
      };

      pc.ondatachannel = (event) => {
        const channel = event.channel;
        channel.onmessage = (e) => {
          if (e.data === 'start') {
            startTimer(); // starts the timer on the caller's side
          }
        };
      };


      const offerDescription = await pc.createOffer(); /** returns offer description */
      await pc.setLocalDescription(offerDescription); /** sets offer description as
      local description on peer conenction */



      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      }; /** sets sdp value to js object */

      await setDoc(callDoc, { offer }); /** call document set with that js object */

      onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer); /** 
        set answer description on peer connection locally
        listens to database for answer
        once answer is recieved, update that on peer connection */
          pc.setRemoteDescription(answerDescription);
        }
      });

      onSnapshot(answerCandidates, (snapshot) => { /** when answered, 
    add candidate to peer connection */
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            /** create new ice candidate with document data
             * add candidate to peer connection */
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });
    }
    // when all buttons are on dom and call is answered, aka people are 
    // video chatting
    if (hangupButton.current && toggleAudioButton.current && toggleVideoButton.current) {
      hangupButton.current.disabled = false; //enable hangup button

      // uncomment if patient/psychiatrist should be able to toggle audio/video before call starts
      toggleAudioButton.current.disabled = false; //enable toggleaudio button
      toggleVideoButton.current.disabled = false; //enable togglevideo button
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

    const callRef = doc(db, 'calls', callId);
    const answerCandidates_ = collection(callRef, 'answerCandidates');
    const offerCandidates_ = collection(callRef, 'offerCandidates');

    if (pc) {


      pc.onicecandidate = (event) => {
        event.candidate && addDoc(answerCandidates_, event.candidate.toJSON());
      };

      pc.ondatachannel = (event) => {
        const channel = event.channel;
        channel.onmessage = (e) => {
          if (e.data === 'start') {
            startTimer(); // starts the timer on the answerer's side
          }
        };

        // Add the event listener for the open event
        channel.addEventListener('open', () => {
          channel.send('start');
        });

        // Set the received data channel to the state
        setDataChannel(channel);
      };

      const callDocSnapshot = await getDoc(callRef);
      const callData = callDocSnapshot.data();

      const offerDescription = callData?.offer;
      await pc?.setRemoteDescription(new RTCSessionDescription(offerDescription));
      /** sets remote description on peer connection */

      // create offer method as local description on peer connection
      // object contains sdp value (session description protocol)
      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type, // convert to js object
        sdp: answerDescription.sdp, // convert to js object
      };

      await updateDoc(callRef, { answer });
      startTimer(); // starts timer for call


      onSnapshot(offerCandidates_, (snapshot) => {
        const changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (change.type === 'added') {
            const data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          } /** when new ice candidate is added to that collection
        create ice candidate locally */
        });
      });
    }
  };

  /**
   * Closes the peer connection and disables the webcam button. Disables 
   * all the buttons and clears the call input fields. Resets to default values.
   */
  const hangupCall = () => {
    if (pc) {
      pc.close();
    }
    // Stop the timer when the call is hung up
    stopTimer();
    setTimer(0);
    setisVideoEnabled(false); // booleans for checking if video/audio on/off
    setisAudioEnabled(false);

    //after hanging up, doesnt let you make another call. TODO might need to fix this

    if (webcamButton.current) {
      webcamButton.current.disabled = false;
    }

    if (callButton.current && toggleAudioButton.current && answerButton.current && hangupButton.current && toggleVideoButton.current) {
      //checking if all buttons exist
      callButton.current.disabled = true;
      answerButton.current.disabled = true;
      hangupButton.current.disabled = true;
      // toggleVideoButton.current.disabled = true;
      // toggleAudioButton.current.disabled = true;
      // unsure about if we want disabling on for toggling buttons
    }

    if (callInput.current) {
      callInput.current.value = "";
    }

    setLocalStream(null); /** setting values for local stream (user webcam) */
    setRemoteStream(null); /** setting values for remote stream (other's webcam) */

    // uncomment if patient/psychiatrist should be able to toggle audio/video before call starts
    // toggleAudioButton.current.disabled = true; //enable toggleaudio button
    // toggleVideoButton.current.disabled = true; //enable togglevideo button



    if (webcamVideo.current) {
      webcamVideo.current.srcObject = null;
    }

    if (remoteVideo.current) {
      remoteVideo.current.srcObject = null;
    }
  };

  const toggleAudio = () => { /** button for toggling user's outgoing audio */
    if (localStream) {
      //gets audiotrack from user (localStream)
      const audioTrack = localStream.getAudioTracks()[0];
      if (isAudioEnabled) {
        audioTrack.enabled = false;
        setisAudioEnabled(false);
        //there is no indication for muted
      } else {
        audioTrack.enabled = true;
        setisAudioEnabled(true);
        //there is no indication for unmuted
      }
    }
    else {
      alert("please allow access to camera/audio before toggling");
    }
  };

  const toggleVideo = () => {
    // gets videotrack from user (localStream)
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (isVideoEnabled) {
        videoTrack.enabled = false; // turns off camera, shows black box
        setisVideoEnabled(false);

        // webcamVideo.current!.srcObject = null; // removes black screen from line above.
        // uncomment out if thats a feature we want

        // videoTrack!.stop(); // this line pauses the video
        // on the dom and stops sharing instead of getting rid of the box
        // pauses on screen
        // need to add more to else block if we are to use stop() instead
      } else {
        videoTrack.enabled = true;

        // webcamVideo.current!.srcObject = localStream; // adds screen back from 
        // corresponding line in if block.
        // uncomment out if thats a feature we want

        setisVideoEnabled(true);
      }
    }
    else {
      alert("please allow access to camera/audio before toggling");
    }
  };

  const startTimer = () => {
    if (intervalID === null) {
      const newIntervalID = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setIntervalID(newIntervalID);
    }
  };

  const stopTimer = () => {
    if (intervalID) {
      clearInterval(intervalID);
      setIntervalID(null);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between bg-[#C1C1C1] px-4 py-2">
        <div>
          <div className="font-semibold text-xl text-white">
            <span>[Psychiatrist's Name]</span> and <span>[Patient's Name]</span>'s meeting
          </div>
          <div className="text-white">
            <span>2 participants</span> | <span>{formatTime(timer)}</span>
          </div>
        </div>
        <div className="text-white flex items-center">
          {layoutOption === "grid" ? (
            <>
              <span
                onClick={() => setLayoutOption("spotlight")}
                className="cursor-pointer mr-4 mt-2 flex items-center"
              >
                <Grid className="mr-2" />
                <span className="text-sm">Grid View</span>
              </span>
            </>
          ) : (
            <>
              <span
                onClick={() => setLayoutOption("grid")}
                className="cursor-pointer mr-4 mt-2 flex items-center"
              >
                <Spotlight className="mr-2" />
                <span className="text-sm">Spotlight View</span>
              </span>
            </>
          )}
        </div>
      </div>
      {layoutOption === 'grid' ? (
        <div className="flex justify-center items-center mt-6">
          <video ref={webcamVideo} autoPlay muted playsInline className="w-1/2 m-8 bg-[#2c3e50]" />
          <video ref={remoteVideo} autoPlay playsInline className="w-1/2 m-8 bg-[#2c3e50]" />
        </div>
      ) : (
        <div className="relative mt-6">
          <video ref={remoteVideo} autoPlay playsInline className="w-10/12 h-screen m-8 bg-[#2c3e50] border-black border-2" />
          <video ref={webcamVideo} autoPlay muted playsInline className="absolute bottom-6 right-6 w-1/4 h-auto bg-[#2c3e50] border-black border-2" />
        </div>
      )}
      <div className="media-controls flex justify-between items-center bg-gray-200 p-4 ">
        <button className="btn">Settings</button>
        <div>
          <button ref={toggleAudioButton} onClick={toggleAudio} className="video mx-2"><Audio /></button>
          <button ref={toggleVideoButton} onClick={toggleVideo} className="video mx-2"><Video /></button>
          <button className="mx-2"><Chat /></button>
        </div>
        <button
          ref={hangupButton}
          onClick={hangupCall}
          className="btn"
        >
          Leave meeting
        </button>
      </div>

      <div className="testing mt-20">
        <button ref={webcamButton} onClick={setupMediaSources} id="startWebcam" className="bg-[#C1C1C1] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Start webcam
        </button>
        <button
          ref={callButton}
          onClick={createOffer}
          id="call"
          className="bg-[#C1C1C1] hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Call
        </button>
        <button
          ref={answerButton}
          id="answer"
          onClick={answerCall}
          className="bg-[#C1C1C1] hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Answer
        </button>
        <div className="flex items-center">
          <label htmlFor="callToken" className="mr-2">Put Call token here:</label>
          <input ref={callInput} type="text" id="callToken" className="border rounded py-1 px-2" />
        </div>
      </div>
    </div>
  );
};

export default VideoChat;