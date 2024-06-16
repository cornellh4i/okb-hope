const ReportPopup = ({ report, showPatientsReports }) => {
  const getFormattedDate = (date) => {
    if (!date) return 'Unknown date';
    try {
      const dateObj = date.toDate ? date.toDate() : new Date(date);
      return dateObj.toLocaleString();
    } catch {
      return 'Unknown date';
    }
  };
  const formattedDate = getFormattedDate(report.submittedAt);


  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '10px',
    padding: '8px 12px',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={cardStyle} className="card bg-base-100">
      <div className="flex flex-col gap-3">
        <h2 className="font-bold font-montserrat">Submitted By: <span className="font-normal">{report.reporter_name}</span> </h2>
        <h2 className="font-bold font-montserrat">Person Reported: <span className="font-normal">{showPatientsReports ? report.patient_name : `Dr. ${report.psych_name}`}</span> </h2>
        <h2 className="font-bold font-montserrat">Submitted On: <span className="font-normal">{formattedDate}</span></h2>
        <p style={{ fontSize: '14px', border: '1px solid #c7c5c5', color: '#000000', padding: '8px 12px' }} className="font-normal font-montserrat"> {report.description}</p>
      </div>
    </div>
  );
};

export default ReportPopup;