import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import ChevronDown from '@/assets/chevron_down';
import ChevronUp from '@/assets/chevron_up';
import Close from '@/assets/close.svg';
import ReportPopup from './ReportPopup';
import okb_colors from '@/colors';
import { IReport } from '@/schema';

const ReportCard = ({ report, onReportClick }) => {

  const getFormattedDate = (date) => {
    if (!date) return 'Unknown date';
    try {
      const dateObj = date.toDate ? date.toDate() : new Date(date);
      return dateObj.toLocaleString();
    } catch {
      return 'Unknown date';
    }
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  const formattedDate = getFormattedDate(report.submittedAt);

  const cardStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: 'transparent',
    border: '2px solid #d1d5db',
    borderRadius: '0.5rem',
    padding: '1.25rem',
    margin: '0.5rem',
    width: '100%', // Ensures the card takes the full width of its container
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const subjectStyle: React.CSSProperties = {
    color: 'black',
    fontSize: '16px',
    fontWeight: '400',
    padding: '0 10px', // Equal padding on left and right
    textAlign: 'center', // Center text
    flex: '1 1 30%', // Adjust flex basis for responsiveness
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const col2style = {
    ...subjectStyle,
    flex: '1 1 20%', // Adjusted flex basis
    paddingLeft: '0px', // No left padding for column two
    paddingRight: '140px' // Equal padding between columns
  };

  const col3style = {
    ...subjectStyle,
    flex: '1 1 20%', // Adjusted flex basis
    paddingLeft: '0px', // Equal padding between columns
    paddingRight: '30px' // Equal padding between columns
  };

  const col4style = {
    ...subjectStyle,
    flex: '1 1 20%', // Adjusted flex basis
    paddingLeft: '90px', // More left padding for column four to move it to the right
    paddingRight: '0px' // No right padding for column four
  };

  const col1style = {
    ...subjectStyle,
    flex: '1 1 20%', // Adjusted flex basis
    paddingLeft: '0px', // No left padding for column one
    paddingRight: '80px' // More right padding for column one to move it further to the left
  };

  return (
    <div className="flex items-center mx-5 lg:mx-36 my-2" onClick={() => onReportClick(report)}>
      <div className='flex justify-between items-center w-full rounded-lg' style={cardStyle}>
        <div className="font-montserrat" style={col1style}>{truncateText(report.description, 25)}</div>
        <div className="font-montserrat" style={col2style}>{report.reporter_name}</div>
        <div className="font-montserrat" style={col3style}>Dr. {report.psych_name}</div>
        <div className="font-montserrat" style={col4style}>{formattedDate}</div>
      </div>
    </div>
  );
};

const AdminReport = () => {
  const [selectedReport, setSelectedReport] = useState<IReport | null>(null);
  const [reports, setReports] = useState<IReport[]>([]);
  const [unreadReports, setUnreadReports] = useState<boolean>(true); // Set to true
  const [highPriorityReports, setHighPriorityReports] = useState<boolean>(true); // Set to true
  const [mediumPrioityReports, setMediumPriorityReports] = useState<boolean>(true); // Set to true
  const [lowPriorityReports, setLowPriorityReports] = useState<boolean>(true); // Set to true
  const [spamReports, setSpamReports] = useState<boolean>(true); // Set to true
  const [showPopup, setShowPopup] = useState<boolean>(false);

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

    console.log(fetchedReports)
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
            <ReportCard
              key={report.report_id}
              report={report}
              onReportClick={handleOpenPopup}
            />
          </div>
        )) : null}
      </div>
    )
  }

  const ReportDetailsPopup = () => {
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
    const [isOpen, setIsOpen] = useState(false);
    if (!showPopup) return null;

    const dropdownContainerStyle: React.CSSProperties = {
      position: 'absolute',
      top: buttonPosition.top + 35, // Adjusted to position below the button
      left: buttonPosition.left, // Align the left edge of the dropdown with the button
      zIndex: 1001,
      overflow: 'hidden',
    };


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

    const calculateDropdownPosition = () => {
      const buttonElement = document.getElementById('assign-priority-button');

      // Check if buttonElement exists
      if (buttonElement) {
        const buttonRect = buttonElement.getBoundingClientRect();

        // Calculate the top and left position for the dropdown
        const top = buttonRect.bottom;
        const left = buttonRect.left;

        // Set the dropdown position
        setButtonPosition({ top, left });
      }
    };

    // Effect to recalculate dropdown position when isOpen changes
    useEffect(() => {
      if (isOpen) {
        calculateDropdownPosition();
      }
    }, [isOpen]);

    useEffect(() => {
      const handleResize = () => {
        if (isOpen) {
          calculateDropdownPosition();
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [isOpen]);


    const buttonsContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '20px'
    };

    const cancelButtonStyle = {
      backgroundColor: 'white',
      color: okb_colors.dark_gray,
      padding: '8px',
      borderRadius: '10px',
      border: '3px solid #519AEB',
      cursor: 'pointer',
    };

    const assignPriorityButtonStyle: React.CSSProperties = {
      backgroundColor: '#519AEB',
      color: 'white',
      padding: '8px',
      borderRadius: isOpen ? '10px 10px 0 0' : '10px', // Adjusted border radius based on the toggle state
      border: '2px solid #519AEB',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      position: 'relative' // Position the button relatively
    };


    const dropdownListStyle = {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    };

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handlePrioritySelection = (selectedPriority) => {
      updateReportPriority(selectedPriority);
      toggleDropdown();
    };

    const dropdownItemStyle = {
      padding: '8px 16px',
      color: 'black',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      backgroundColor: '#E5E7EB',
      border: '2px solid #E5E7EB',
    };

    const dropdownItemHoverStyle = {
      backgroundColor: '#E5E7EB',
      color: 'black',
    };

    const handleMouseEnter = (event) => {
      event.target.style.backgroundColor = '#519AEB';
      event.target.style.color = 'white';
    };

    const handleMouseLeave = (event) => {
      event.target.style.backgroundColor = '#E5E7EB';
      event.target.style.color = 'black';
    };

    return (
      <div>
        <div className="modal modal-open">
          <div className="modal-box" style={{ maxHeight: '50%' }}>
            <Close className="modal-action" onClick={handleClosePopup} style={{ position: 'absolute', top: 12, right: 12, cursor: 'pointer' }} />
            <h1 className="text-xl font-semibold font-montserrat" style={{ margin: '0 auto', fontSize: 20, paddingBottom: '10px' }}>Report Information</h1>
            <div className="space-y-4">
              <ReportPopup key={selectedReport?.report_id} report={selectedReport} />
            </div>
            <div style={buttonsContainerStyle}>
              <button
                style={cancelButtonStyle}
                className='font-montserrat'
                onClick={handleClosePopup}
              >Cancel</button>
              <button
                id="assign-priority-button"
                onClick={toggleDropdown}
                style={assignPriorityButtonStyle}
                className='font-montserrat'
              >
                Assign Priority {isOpen ? <ChevronUp color='white' /> : <ChevronDown color='white' />}
              </button>
            </div>
          </div>
          {isOpen && (
            <div style={{ ...dropdownContainerStyle, top: buttonPosition.top }}>
              <ul style={dropdownListStyle}>
                {priorities.map((priority) => (
                  <li
                    key={priority}
                    onClick={() => handlePrioritySelection(priority)}
                    style={{
                      ...dropdownItemStyle,
                      ...(isOpen && dropdownItemHoverStyle),
                      ...(priority === "Spam" && { borderRadius: '0 0 10px 10px' }) // Apply borderRadius to "Spam" option only
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className='font-montserrat'
                  >
                    {priority !== "Spam" ? priority + " Priority" : priority}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div >
    );
  };

  return (
    <div className="admin-reports-container flex flex-col text-21 font-bold mb-1">
      {/* Header and column categories bar */}
      <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 5, display: 'inline-flex' }}>
        <div className="mt-5 mb-5 ml-5 lg:ml-36">
          <button className="tab relative text-slate-300 border-b-2 border-slate-300 text-3xl">
            <span className="relative z-10 font-montserrat font-semibold">Clients</span>
          </button>
          <button className="tab tab-bordered relative text-sky-700 border-b-2 border-sky-700 text-3xl">
            <span className="relative z-10 font-montserrat font-semibold">Psychiatrists</span>
          </button>
        </div>

        <div className='flex items-center lg:mx-36' style={{ alignSelf: 'stretch', height: 70, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex' }}>
          <div className=' flex justify-between items-center w-full px-5 md:px-12' style={{ alignSelf: 'stretch', paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
            <div className="font-montserrat" style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word' }}>Subject</div>
            <div className="font-montserrat" style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word' }}>Submitted By</div>
            <div className="font-montserrat" style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word' }}>Psychiatrist Reported</div>
            <div className="font-montserrat" style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word' }}>Time Submitted</div>
          </div>
          <div style={{ alignSelf: 'stretch', height: 0, border: '1.5px black solid' }}></div>
        </div>
      </div>

      <div>
        <div className='flex items-center mx-5 lg:mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div className="font-montserrat" style={{ color: 'black', fontSize: 25, fontWeight: '600', wordWrap: 'break-word' }}>Unread Reports</div>
          <button onClick={toggleUnreadReports} style={{ marginLeft: '5px' }}>
            {unreadReports ? <ChevronUp color={okb_colors.black} /> : <ChevronDown color={okb_colors.black} />}
          </button>
        </div>

        {returnReportsByPriority("")}
        <ReportDetailsPopup />

        <div className='flex items-center mx-5 lg:mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div className="font-montserrat" style={{ color: 'black', fontSize: 25, fontWeight: '600', wordWrap: 'break-word' }}>High Priority</div>
          <button onClick={toggleHighPriorityReports} style={{ marginLeft: '5px' }}>
            {highPriorityReports ? <ChevronUp color={okb_colors.black} /> : <ChevronDown color={okb_colors.black} />}
          </button>
        </div>

        {returnReportsByPriority("High")}

        <div className='flex items-center mx-5 lg:mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div className="font-montserrat" style={{ color: 'black', fontSize: 25, fontWeight: '600', wordWrap: 'break-word' }}>Medium Priority</div>
          <button onClick={toggleMediumPriorityReports} style={{ marginLeft: '5px' }}>
            {mediumPrioityReports ? <ChevronUp color={okb_colors.black} /> : <ChevronDown color={okb_colors.black} />}
          </button>
        </div>

        {returnReportsByPriority("Medium")}

        <div className='flex items-center mx-5 lg:mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div className="font-montserrat" style={{ color: 'black', fontSize: 25, fontWeight: '600', wordWrap: 'break-word' }}>Low Priority</div>
          <button onClick={toggleLowPriorityReports} style={{ marginLeft: '5px' }}>
            {lowPriorityReports ? <ChevronUp color={okb_colors.black} /> : <ChevronDown color={okb_colors.black} />}
          </button>
        </div>

        {returnReportsByPriority("Low")}

        <div className='flex items-center mx-5 lg:mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div className="font-montserrat" style={{ color: 'black', fontSize: 25, fontWeight: '600', wordWrap: 'break-word' }}>Spam</div>
          <button onClick={toggleSpamReports} style={{ marginLeft: '5px' }}>
            {spamReports ? <ChevronUp color={okb_colors.black} /> : <ChevronDown color={okb_colors.black} />}
          </button>
        </div>

        {returnReportsByPriority("Spam")}

      </div>
    </div>
  );
};

export default AdminReport;