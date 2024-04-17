import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, doc, updateDoc} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { IReport } from '@/schema';
import ChevronDown from '@/assets/chevron_down';
import ChevronUp from '@/assets/chevron_up';
import Close from '@/assets/close.svg';
import ReportPopup from './ReportPopup';
import Cancel from "@/assets/cancel.svg";
import Submit from "@/assets/submit.svg";

const ReportCard = ({ report, onReportClick }) => {
  const formattedDate = report.submittedAt?.toDate
    ? report.submittedAt.toDate().toLocaleString()
    : typeof report.submittedAt === 'string'
      ? new Date(report.submittedAt).toLocaleString()
      : 'Unknown date';

  const cardStyle = {
    backgroundColor: 'transparent',
    border: '2px solid #d1d5db',
    borderRadius: '0.5rem',
    padding: '1.25rem',
    margin: '0.5rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div className="flex items-center mx-36 my-2" onClick={() => onReportClick(report)}>
      <div className='flex justify-between items-center w-full rounded-lg' style={cardStyle}>
        <div style={{ width: "150px" }}>{report.title || 'No Title'}</div>
        <div style={{ width: "150px" }}>{report.description}</div>
        <div style={{ width: "150px" }}>{report.patient_id}</div>
        <div style={{ width: "150px" }}>{formattedDate}</div>
      </div>
    </div>
  );
};

const AdminReport = () => {
  const [selectedReport, setSelectedReport] = useState<IReport | null>(null);
  const [reports, setReports] = useState<IReport[]>([]);
  const [unreadReports, setUnreadReports] = useState<Boolean>(false);
  const [highPriorityReports, setHighPriorityReports] = useState<Boolean>(false);
  const [mediumPrioityReports, setMediumPriorityReports] = useState<Boolean>(false);
  const [lowPriorityReports, setLowPriorityReports] = useState<Boolean>(false);
  const [spamReports, setSpamReports] = useState<Boolean>(false);
  const [showPopup, setShowPopup] = useState<Boolean>(false);

// Define fetchReports outside of useEffect so it can be used elsewhere
const fetchReports = async () => {
  const q = query(collection(db, 'reports'));
  const querySnapshot = await getDocs(q);
  const fetchedReports = querySnapshot.docs.map(doc => {
    const data = doc.data();
    const submittedAtDate = data.submittedAt.toDate();
    return {
      ...data,
      report_id: doc.id,
      submittedAt: submittedAtDate
    } as IReport;
  });
  setReports(fetchedReports);
};

// Call fetchReports inside useEffect
useEffect(() => {
  fetchReports();
}, []);


  const toggleUnreadReports = () => {
    setUnreadReports(!unreadReports)
  }

  const toggleHighPriorityReports = () => {
    setHighPriorityReports(!highPriorityReports)
  }

  const toggleMediumPriorityReports = () => {
    setMediumPriorityReports(!mediumPrioityReports)
  }

  const toggleLowPriorityReports = () => {
    setLowPriorityReports(!lowPriorityReports)
  }

  const toggleSpamReports = () => {
    setSpamReports(!spamReports)
  }

  // Trigger report popup to show up
  const handleOpenPopup = (report) => {
    setSelectedReport(report);
    setShowPopup(true);
  };

  // Trigger report popup to close
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedReport(null);
  };

  const updateReportPriority = async (newPriority) => {
    if (selectedReport != null) {
      const reportRef = doc(db, 'reports', selectedReport.report_id);
      try {
        await updateDoc(reportRef, { priority: newPriority });
        // Update the local state to reflect the change
        setSelectedReport({ ...selectedReport, priority: newPriority });
        // Refetch reports to refresh the list
        await fetchReports();
      } catch (error) {
        console.error("Error updating priority: ", error);
      }
    }
  };

  const returnReportsByPriority = (selectedPriority) => {
    let bool = false;
    if (selectedPriority == "") {
      bool = unreadReports.valueOf()
    }
    else if (selectedPriority == "High") {
      bool = highPriorityReports.valueOf()
    }
    else if (selectedPriority == "Medium") {
      bool = mediumPrioityReports.valueOf()
    }
    else if (selectedPriority == "Low") {
      bool = lowPriorityReports.valueOf()
    }
    else if (selectedPriority == "Spam") {
      bool = spamReports.valueOf()
    }

    return (

      <div>
      {bool ? reports.filter(report => report.priority === selectedPriority).map((report, index) => (
        <div
          key={report.report_id}
          className="report-card"
          style={{ cursor: 'pointer' }}>
          <ReportCard key={report.report_id} report={report} onReportClick={handleOpenPopup} />
        </div>
        )) : null}
      </div>
    )
  }

  const ReportDetailsPopup = () => {
    if (!showPopup) return null;

    const formattedDate = "Unknown Date"

    const priorities = ['High', 'Medium', 'Low', 'Spam'];

    const popupStyle: React.CSSProperties = {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      width: '30%',
      maxWidth: '500px',
      zIndex: 1000,
      position: 'fixed',
      left: '35%',
      top: '20%'
    };

    const buttonsContainerStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'flex-end', // Aligns the buttons to the right
      gap: '8px'
  };



    return (
      <div>
        <div className="modal modal-open">
          <div className="modal-box" style={{
            position: 'relative', display: 'flex', flexDirection: 'column', height: '50%', gap: 12, padding: 24, alignItems: 'center'
          }}>
            <Close className="modal-action" onClick={handleClosePopup} style={{ position: 'absolute', top: 12, right: 12, cursor: 'pointer' }} />
            <div className="text-xl font-bold" style={{ margin: '0 auto', fontSize: 15 }}>Report Information</div>
            <div className="space-y-4" style={{
              width: '100%', height: '100%', overflowY: 'auto', background: 'white', borderRadius: 10, flexDirection: 'column', justifyContent: 'flex-start', gap: 12, display: 'flex'
            }}>
              <ReportPopup key={selectedReport?.report_id} report={selectedReport} />
            </div>
            <div style={buttonsContainerStyle}>

            <div>
            <select
          value={selectedReport?.priority || 'Set Priority'}
          onChange={(e) => updateReportPriority(e.target.value)}
        >
          <option disabled>Set Priority</option>
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority !== "Spam" ? priority + " Priority" : priority}
            </option>
          ))}
        </select>
            </div>
      </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-reports-container flex flex-col" style={{ padding: '50px' }}>
      {/* Header and column categories bar */}
      <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'inline-flex' }}>
        <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
          <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex' }}>
            <div style={{ color: '#9A9A9A', fontSize: 24, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>Clients </div>
            <div style={{ width: 146, height: 0, border: '4px #9A9A9A solid' }}></div>
          </div>
          <div style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex' }}>
            <div style={{ color: '#195BA5', fontSize: 24, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word' }}>Psychiatrists </div>
            <div style={{ width: 207, height: 0, border: '4px #195BA5 solid' }}></div>
          </div>
        </div>
        <div style={{ alignSelf: 'stretch', height: 70, padding: 10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex' }}>
          <div style={{ alignSelf: 'stretch', paddingLeft: 48, paddingRight: 48, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
            <div style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '700', wordWrap: 'break-word' }}>Title</div>
            <div style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '700', wordWrap: 'break-word' }}>Subject</div>
            <div style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '700', wordWrap: 'break-word' }}>Submitted By</div>
            <div style={{ color: 'black', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '700', wordWrap: 'break-word' }}>Time Submitted</div>
          </div>
          <div style={{ alignSelf: 'stretch', height: 0, border: '3px black solid' }}></div>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="text-black text-2xl font-semibold font-['Montserrat']">Unread Reports</div>
          <button onClick={toggleUnreadReports}>
            {unreadReports ? ChevronDown : ChevronUp}
          </button>
        </div>


        {/* Report list container with overflow */}
        {returnReportsByPriority("")}
        {ReportDetailsPopup()}

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="text-black text-2xl font-semibold font-['Montserrat']">High Priority</div>
          <button onClick={toggleHighPriorityReports}>
            {highPriorityReports ? ChevronDown : ChevronUp}
          </button>
        </div>
        {returnReportsByPriority("High")}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="text-black text-2xl font-semibold font-['Montserrat']">Medium Priority</div>
          <button onClick={toggleMediumPriorityReports}>
            {mediumPrioityReports ? ChevronDown : ChevronUp}
          </button>
        </div>
        {returnReportsByPriority("Medium")}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="text-black text-2xl font-semibold font-['Montserrat']">Low Priority</div>
          <button onClick={toggleLowPriorityReports}>
            {lowPriorityReports ? ChevronDown : ChevronUp}
          </button>
        </div>
        {returnReportsByPriority("Low")}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="text-black text-2xl font-semibold font-['Montserrat']">Spam</div>
          <button onClick={toggleSpamReports}>
            {spamReports ? ChevronDown : ChevronUp}
          </button>
        </div>
        {returnReportsByPriority("Spam")}
      </div>
    </div>
  );
};

export default AdminReport;

