import { useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { db } from '../../../../firebase/firebase';
import Link from 'next/link';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { IPsychiatrist, IReport } from '@/schema';
import ViewReport from '@/assets/view_reports.svg';
import Close from '@/assets/close.svg';
import okb_colors from "@/colors";
import { fetchPatientReports } from '../../../../firebase/fetchData';
import colors from '@/colors';

const ReportCard = ({ report, psychiatrist }) => {
  // Format the date string
  const formattedDate = report.submittedAt.toDate().toLocaleString();

  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '10px',
    border: '1px solid #519AEB',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '12px 24px',
    margin: '0 0 12px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  return (
    <div style={cardStyle} className="card bg-base-100 shadow-xl mb-4">
      <div>
        <p className="font-montserrat" style={{ fontSize: 14 }}>The following report for Dr. {psychiatrist.firstName} {psychiatrist.lastName} was submitted on: {formattedDate}</p>
      </div>
      <p className="font-montserrat" style={{ fontSize: 14 }}>Report Log</p>
      <div>
        <p className="font-montserrat" style={{ fontSize: 14, border: '1px solid #9A9A9A', color: '#000000', padding: '8px 12px' }}>{report.description}</p>
      </div>
      <p className="font-montserrat" style={{ fontSize: 14, textAlign: 'left' }}>Report Status: Verified on {formattedDate}</p>
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
    async function fetchReports() {
      try {
        const fetchedReports: IReport[] = await fetchPatientReports(user?.uid);
        setReports(fetchedReports);
      } catch (err: any) {
        console.error(err.message);
      }
    }
    if (user) {
      fetchReports();
    }
  }, [user]);

  // Fetch psychiatrist information based on the reports
  useEffect(() => {
    async function fetchPsychiatrists() {
      try {
        const uniquePsychIds = new Set(reports.map(report => report.psych_id));
        const psychIdsArray = Array.from(uniquePsychIds).filter(id => id); // Filter out undefined values

        const psychRef = collection(db, 'psychiatrists');
        const batchSize = 10;

        const fetchedPsychiatrists: IPsychiatrist[] = [];

        // Perform batched queries
        for (let i = 0; i < psychIdsArray.length; i += batchSize) {
          const batch = psychIdsArray.slice(i, i + batchSize);
          const q = query(psychRef, where('uid', 'in', batch));
          const snapshot = await getDocs(q);
          const batchPsychiatrists: IPsychiatrist[] = snapshot.docs.map(doc => doc.data() as IPsychiatrist);
          fetchedPsychiatrists.push(...batchPsychiatrists);
        }

        setPsychiatrists(fetchedPsychiatrists);
      } catch (err) {
        console.error(err);
      }
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
        <div className="modal-box " style={{
          position: 'relative', display: 'flex', flexDirection: 'column', maxHeight: '50%', gap: 12, padding: 24, alignItems: 'center'
        }}>
          <Close className="modal-action" onClick={() => setShowReportHistoryPopup(false)} style={{ position: 'absolute', top: 0, right: 12, cursor: 'pointer' }} />
          <div className="text-xl font-bold font-montserrat" style={{ margin: '0 auto', fontSize: 15 }}>Report Information</div>
          <div className="space-y-4" style={{
            width: '100%', height: '100%', overflowY: 'auto', background: 'white', borderRadius: 10, flexDirection: 'column', justifyContent: 'flex-start', gap: 12, display: 'flex'
          }}>
            {selectedPsychiatristReports.map(report => (
              <ReportCard key={report.report_id} report={report} psychiatrist={selectedPsychiatrist} />
            ))}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className={'px-4 lg:px-24 px-32 pt-9 pb-14'}>
      <h1 className="text-3xl font-montserrat font-semibold mb-6">Report History</h1> {/* Title added here */}
      <div className={`psychiatrist-list flex flex-col items-stretch gap-6 w-full`}>
        {psychiatrists.map((psychiatrist) => (
          <div key={psychiatrist.uid} className="psychiatrist w-full" onClick={() => handleGoToProfProfile(psychiatrist.uid)}>
            {/* Display the psychiatrist's information here */}
            <div className={`card card-side flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-2.5 rounded-lg bg-[${okb_colors.white}] shadow-[0_0px_5px_0px_rgb(0,0,0,0.15)] gap-x-6 hover:brightness-90 p-6 w-full`}>
              <div className={`flex items-center justify-center flex-shrink-0 mb-4 lg:mb-0`}>
                <div style={{ backgroundColor: colors.okb_blue, objectFit: "cover" }} className={`w-36 h-36 text-6xl font-normal text-white flex items-center justify-center`}>
                  {psychiatrist.firstName?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className={`flex flex-col flex-1 gap-4 w-full h-auto`}>
                {/* Grid (to enable easier organization of columns) w/ psychiatrist name + buttons */}
                <div className={`flex flex-col lg:flex-row justify-between items-start w-full`}>
                  <div className={`flex flex-col justify-center lg:items-start items-center gap-2 w-full`}>
                    <h2 className={`card-title col-span-2 text-[${okb_colors.black}] text-[24px] font-montserrat font-semibold not-italic`}>{psychiatrist.firstName} {psychiatrist.lastName}</h2>
                    <p className={`text-[${okb_colors.black}] text-[16px] font-montserrat font-semibold`}>{psychiatrist.position} at {psychiatrist.location}</p>
                  </div>
                  <div className={`flex justify-center lg:justify-end items-center gap-4 w-full lg:w-auto mt-4 lg:mt-0`}>
                    <button onClick={(event) => handleViewReport(event, psychiatrist)}>
                      <ViewReport />
                    </button>
                  </div>
                </div>
                {/* Additional psychiatrist info */}
                <div className={`flex w-full justify-center lg:justify-start items-center lg:items-start mt-4 lg:mt-0`}>
                  {/* <p className={`text-[${okb_colors.dark_gray}] text-[12px] font-montserrat font-normal`}>{psychiatrist.description ? psychiatrist.description : "No description available."}</p> */}
                  <p className={`text-[${okb_colors.dark_gray}] text-[12px] font-montserrat font-normal overflow-hidden overflow-ellipsis`} style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', lineClamp: 3, MozBoxOrient: 'vertical', textAlign: 'left' }}>{psychiatrist.description ? psychiatrist.description : "No description available."}</p>
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
