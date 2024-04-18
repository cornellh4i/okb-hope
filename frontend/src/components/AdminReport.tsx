import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, doc, updateDoc } from 'firebase/firestore';
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

  // Adjusted textStyle for report details
  const textStyle = {
    width: "150px",
    fontWeight: '400' // Use '400' for normal text or '300' for lighter text
  };

  return (
    <div className="flex items-center mx-36 my-2" onClick={() => onReportClick(report)}>
      <div className='flex justify-between items-center w-full rounded-lg' style={cardStyle}>
        <div style={textStyle}>{report.title || 'No Title'}</div>
        <div style={textStyle}>{report.description}</div>
        <div style={textStyle}>{report.patient_id}</div>
        <div style={textStyle}>{formattedDate}</div>
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

    const priorities = ['High', 'Medium', 'Low', 'Spam'];

    const popupStyle = {
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

    const buttonsContainerStyle = {
      display: 'flex',
      justifyContent: 'center', // Aligns child elements (buttons) in the center
      gap: '8px',
      marginTop: '20px' // Adds some space between the buttons and other elements above
    };

    const dropdownStyle = {
      backgroundColor: '#007BFF',
      color: 'white',
      padding: '8px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
    };

    const cancelButtonStyle = {
      backgroundColor: 'white',
      color: 'black',
      padding: '8px',
      borderRadius: '4px',
      border: '2px solid #007BFF',
      cursor: 'pointer',
    };

    

    // const dropdownOption: hover = {
    //   backgroundColor: '#007bff',  /* Blue background on hover */
    //   color: 'white'
    // }

    // const optionStyle = {
    //   backgroundColor: "white",
    //   color: 'black',
    //   padding: '200px',
    //   borderRadius: '5px',
    //   border: 'none',
    //   cursor: 'pointer',

    // };


    return (
      <div>
        <div className="modal modal-open">
          <div className="modal-box">
            <Close className="modal-action" onClick={handleClosePopup} style={{ position: 'absolute', top: 12, right: 12, cursor: 'pointer' }} />
            <h1 className="text-xl font-bold" style={{ margin: '0 auto', fontSize: 20, paddingBottom: '10px' }}>Report Subject</h1>
            <div className="space-y-4" style={{
              width: '100%', height: '100%', overflowY: 'auto', background: 'white', borderRadius: 10, flexDirection: 'column', justifyContent: 'flex-start', gap: 12, display: 'flex'
            }}>
              <ReportPopup key={selectedReport?.report_id} report={selectedReport} />
            </div>
            <div style={buttonsContainerStyle}>
              <button
                style={cancelButtonStyle}
                onClick={handleClosePopup}
              >
                Cancel
              </button>
              <select
                style={dropdownStyle}
                value={selectedReport?.priority || 'Assign Priority'}
                onChange={(e) => updateReportPriority(e.target.value)}>
                <option disabled style={dropdownStyle}>Assign Priority</option>
                {priorities.map((priority) => (
                  <option key={priority} value={priority} style={dropdownStyle}>
                    {priority !== "Spam" ? priority + " Priority" : priority}
                  </option>
                ))}
              </select>


            </div>
          </div>
        </div>
      </div>
    );
  };




  return (
    <div className="admin-reports-container flex flex-col text-21 font-bold mb-1">
      {/* Header and column categories bar */}
      <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 5, display: 'inline-flex' }}>
        <div className="mt-5 mb-5 ml-36">
          <button style={{ fontWeight: 400 }} className="tab relative text-slate-300 border-b-2 border-slate-300 text-3xl">
            <span className="relative z-10">Clients</span>
          </button>
          <button style={{ fontWeight: 400 }} className="tab tab-bordered relative text-sky-700 border-b-2 border-sky-700 text-3xl">
            <span className="relative z-10">Psychiatrists</span>
          </button>
        </div>

        <div className='flex items-center mx-36' style={{ alignSelf: 'stretch', height: 70, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex' }}>
          <div className=' flex justify-between items-center w-full' style={{ alignSelf: 'stretch', paddingLeft: 48, paddingRight: 48, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
            <div style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word' }}>Title</div>
            <div style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word' }}>Subject</div>
            <div style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word' }}>Submitted By</div>
            <div style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word' }}>Time Submitted</div>
          </div>
          <div style={{ alignSelf: 'stretch', height: 0, border: '1.5px black solid' }}></div>
        </div>
      </div>

      <div>
        <div className='flex items-center mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div style={{ color: 'black', fontSize: 25, fontWeight: '650', wordWrap: 'break-word' }}>Unread Reports</div>
          <button onClick={toggleUnreadReports} style={{ marginLeft: '5px' }}>
            {unreadReports ? ChevronDown : ChevronUp}
          </button>
        </div>

        {/* Report list container with overflow */}
        {returnReportsByPriority("")}
        {ReportDetailsPopup()}

        <div className='flex items-center mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div style={{ color: 'black', fontSize: 25, fontWeight: '650', wordWrap: 'break-word' }}>High Priority</div>
          <button onClick={toggleHighPriorityReports} style={{ marginLeft: '5px' }}>
            {highPriorityReports ? ChevronDown : ChevronUp}
          </button>
        </div>

        {returnReportsByPriority("High")}

        <div className='flex items-center mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div style={{ color: 'black', fontSize: 25, fontWeight: '650', wordWrap: 'break-word' }}>Medium Priority</div>
          <button onClick={toggleMediumPriorityReports} style={{ marginLeft: '5px' }}>
            {mediumPrioityReports ? ChevronDown : ChevronUp}
          </button>
        </div>

        {returnReportsByPriority("Medium")}

        <div className='flex items-center mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div style={{ color: 'black', fontSize: 25, fontWeight: '650', wordWrap: 'break-word' }}>Low Priority</div>
          <button onClick={toggleLowPriorityReports} style={{ marginLeft: '5px' }}>
            {lowPriorityReports ? ChevronDown : ChevronUp}
          </button>
        </div>

        {returnReportsByPriority("Low")}

        <div className='flex items-center mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div style={{ color: 'black', fontSize: 25, fontWeight: '650', wordWrap: 'break-word' }}>Spam</div>
          <button onClick={toggleSpamReports} style={{ marginLeft: '5px' }}>
            {spamReports ? ChevronDown : ChevronUp}
          </button>
        </div>

        {returnReportsByPriority("Spam")}

      </div>
    </div>
  );
};

export default AdminReport;

