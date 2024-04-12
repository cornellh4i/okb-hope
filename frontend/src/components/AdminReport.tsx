import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; 
import { IReport } from '@/schema';   

const ReportCard = ({ report}) => {
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
    <div className="flex items-center mx-36 my-2">
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

  useEffect(() => {
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

    fetchReports();
  }, []);

    // Function to handle report card click
    const handleReportClick = (report) => {
      setSelectedReport(report);
    };
  
    // Function to close the popup modal
    const handleClosePopup = () => {
      setSelectedReport(null);
    };

    const ReportDetailsPopup = (report : IReport | null) => {
      if (report == null) return null;

      const formattedDate = "Unknown Date"
  
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
        };
      
      return (
        <div style={popupStyle}>
          <h2>Report Subject</h2>
          <p>Submitted By: {report?.patient_id}</p>
          <p>Submitted On: {formattedDate}</p>
          <p>{report?.description}</p>
          <button onClick={handleClosePopup}>Close</button>
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



      {/* Report list container with overflow */}
      <div>
        {reports.map((report, index) => (
           <div
           key={report.report_id}
           className="report-card"
           onClick={() => handleReportClick(report)}
           style={{
             cursor: 'pointer'
           }}>
          <ReportCard key={report.report_id} report={report} />
          </div>
        ))}
      </div>
      {ReportDetailsPopup(selectedReport)}
    </div>
  );
};

export default AdminReport;

