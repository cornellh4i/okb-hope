import { useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { db } from '../../../../firebase/firebase';
import Link from 'next/link';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { IPsychiatrist, IReport } from '@/schema';
import ViewReport from '@/assets/view_reports.svg';
import okb_colors from "@/colors";

const ReportCard = ({ report }) => {
  // Format the date string
  const formattedDate = report.submittedAt.toDate().toLocaleString();

  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <p>Report submitted on: {formattedDate}</p>
        <p>Description: {report.description}</p>
      </div>
    </div>
  );
};

const ReportList: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [reports, setReports] = useState<IReport[]>([]);
  const [psychiatrists, setPsychiatrists] = useState<IPsychiatrist[]>([]);
  const [selectedPsychiatristReports, setSelectedPsychiatristReports] = useState<IReport[]>([]);
  const [showReportHistoryPopup, setShowReportHistoryPopup] = useState(false);
  const [selectedPsychiatrist, setSelectedPsychiatrist] = useState<IPsychiatrist | null>(null);

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const popupStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    width: '30%', // adjust the width as needed
    maxWidth: '500px', // maximum width of the popup
    zIndex: 1001,
  };

  // Fetch all reports for the user
  useEffect(() => {
    const fetchReports = async () => {
      const reportCollectionRef = collection(db, 'reports');
      const q = query(reportCollectionRef, where('patient_id', '==', user?.uid));
      const querySnapshot = await getDocs(q);
      const fetchedReports: IReport[] = querySnapshot.docs.map(doc => ({
        ...doc.data() as IReport,
        id: doc.id // Include the document ID
      }));
      setReports(fetchedReports);
    };

    if (user) {
      fetchReports();
    }
  }, [user]);

  // Fetch psychiatrist information based on the reports
  useEffect(() => {
    async function fetchPsychiatrists() {
      const uniquePsychIds = new Set(reports.map(report => report.psych_id));
      const fetchedPsychiatrists: IPsychiatrist[] = [];

      for (let id of Array.from(uniquePsychIds)) {
        const docRef = doc(db, 'psychiatrists', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          fetchedPsychiatrists.push(docSnap.data() as IPsychiatrist);
        }
      }

      setPsychiatrists(fetchedPsychiatrists);
    }

    if (reports.length > 0) {
      fetchPsychiatrists();
    }
  }, [reports]);

  // Function to handle when a report is clicked
  const handleViewReport = async (event, psychiatrist: IPsychiatrist) => {
    event.stopPropagation();
    setSelectedPsychiatrist(psychiatrist);
    const filteredReports = reports.filter(report => report.psych_id === psychiatrist.uid);
    setSelectedPsychiatristReports(filteredReports);
    setShowReportHistoryPopup(true);
  };

  // Redirects to a professional's profile page and passes their uid as query parameter
  function handleGoToProfProfile(psych_uid: string) {
    {
      user ?
        router.push({
          pathname: `/${user?.userType}/${user?.uid}/prof_profile`,
          query: { psych_uid: psych_uid }
        })
        : router.push({
          pathname: `/prof_profile`,
          query: { psych_uid: psych_uid }
        })
    }
  }

  // Trigger report popup to show up
  const handleOpenReportHistory = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowReportHistoryPopup(true);
  };

  // Trigger report popup to close
  const handleCloseReportHistory = (event) => {
    event.stopPropagation();
    setShowReportHistoryPopup(false);
  };





  const renderReportPopup = () => {
    if (!showReportHistoryPopup || !selectedPsychiatrist) return null;

    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">{selectedPsychiatrist.firstName} {selectedPsychiatrist.lastName}</h2>
            <h3 className="text-xl font-bold mb-4">Report Information</h3>
          </div>
          <div className="space-y-4">
            {selectedPsychiatristReports.map(report => (
              <ReportCard key={report.report_id} report={report} />
            ))}
          </div>
          <div className="modal-action">
            <button className="btn" onClick={() => setShowReportHistoryPopup(false)}>Close</button>
          </div>
        </div>
      </div>
    );
  };




  return (
    <div className={'px-32 pt-9 pb-14'}>
      <h1 className="text-3xl font-bold mb-6">Report History</h1> {/* Title added here */}
      <div className={`psychiatrist-list flex flex-col items-start gap-6`}>
        {/*showPopup && <LoginPopup onClose={() => setShowPopup(false)} logInWithGoogleAndRedirect={logInWithGoogleAndRedirect} signUpWithGoogleAndRedirect={signUpWithGoogleAndRedirect} />*/}
        {psychiatrists.map((psychiatrist) => (
          <div key={psychiatrist.uid} className="psychiatrist" onClick={() => handleGoToProfProfile(psychiatrist.uid)}>
            {/* Display the psychiatrist's information here */}
            <div className={`card card-side flex flex-row justify-center items-center gap-2.5 rounded-lg bg-[${okb_colors.white}] shadow-[0_0px_5px_0px_rgb(0,0,0,0.15)] items-start gap-x-6 bg-base-100 grid-cols-5 hover:brightness-90 p-6 self-stretch`}>
              <div className={`col-span-1 flex items-center justify-center`}>
                <figure>
                  <img src="https://lh3.googleusercontent.com/a/AGNmyxZobZdPI78Xzk3dOtXciW5fAE3Wn-QIZYlJTdk_=s96-c" alt="Profile Pic" className={`rounded-full w-32 h-32 object-cover`} />
                </figure>
              </div>
              <div className={`flex flex-col items-start gap-4 flex-1 w-full h-auto`}>
                {/* Grid (to enable easier organization of columns) w/ psychiatrist name + buttons */}
                <div className={`flex justify-between items-start self-stretch`}>
                  <div className={`flex flex-col items-start gap-2`}>
                    <h2 className={`card-title col-span-2 text-[${okb_colors.black}] text-[24px] font-semibold not-italic`}>{psychiatrist.firstName} {psychiatrist.lastName}</h2>
                    <p className={`text-[${okb_colors.black}] text-[16px] font-semibold`}>{psychiatrist.position} at {psychiatrist.location}</p>
                  </div>
                  <div className={`flex justify-end items-center gap-4`}>
                    <button onClick={(event) => handleViewReport(event, psychiatrist)}>
                      <ViewReport />
                    </button>

                  </div>
                </div>
                {/* Additional psychiatrist info */}
                <div className={`self-stretch`}>
                  <p className={`text-[${okb_colors.dark_gray}] text-[12px] font-normal`}>{psychiatrist.description}</p>
                </div>
              </div>
            </div>
          </div >
        ))
        }
        {renderReportPopup()}
      </div >
    </div>
  );
};

export default ReportList;