import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import ChevronDown from '@/assets/chevron_down';
import ChevronUp from '@/assets/chevron_up';
import Close from '@/assets/close.svg';
import ReportPopup from './ReportPopup';
import okb_colors from '@/colors';
import { IReport } from '@/schema';

const ReportCard = ({ report, onReportClick, windowWidth, showPatientsReports }) => {
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

  // Adjusted styles for each column
  const col1style = {
    ...subjectStyle,
    flex: '1 1 5%', // Adjusted flex basis for responsiveness
    padding: '0 5px', // Adjusted padding for smaller screens
  };

  const col2style = {
    ...subjectStyle,
    flex: '1 1 10%', // Adjusted flex basis for responsiveness
    padding: '0 5px', // Adjusted padding for smaller screens
  };

  const col3style = {
    ...subjectStyle,
    flex: '1 1 10%', // Adjusted flex basis for responsiveness
    padding: '0 5px', // Adjusted padding for smaller screens
  };

  const col4style = {
    ...subjectStyle,
    flex: '1 1 5%', // Adjusted flex basis for responsiveness
    padding: '0 5px', // Adjusted padding for smaller screens
  };

  // Adjusted card style for consistent width
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
    flexWrap: 'wrap', // Allow flex items to wrap to next line if needed
  };

  const shouldDisplayTimeSubmitted = () => {
    return windowWidth >= 768; // Only display if window width is greater than or equal to 768px
  };

  return (
    <div className="flex items-center mx-5 lg:mx-36 my-2" onClick={() => onReportClick(report)}>
      <div className='flex justify-between items-center w-full rounded-lg' style={cardStyle}>
        <div className="font-montserrat" style={col1style}>{truncateText(report.description, 25)}</div>
        <div className="font-montserrat" style={col2style}>{report.reporter_name}</div>
        <div className="font-montserrat" style={col3style}>
          {showPatientsReports ? report.patient_name : `Dr. ${report.psych_name}`}
        </div>
        {shouldDisplayTimeSubmitted() && <div className="font-montserrat" style={col4style}>{formattedDate}</div>}
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
  const [showPatientsReports, setShowPatientsReports] = useState(false); // Set to false
  const [showPsychiatristsReports, setShowPsychiatristsReports] = useState(true); // Set to true
  const [patientsButtonClass, setPatientsButtonClass] = useState("tab relative text-slate-300 border-b-2 border-slate-300 text-3xl"); // Set appropriate class for inactive state
  const [psychiatristsButtonClass, setPsychiatristsButtonClass] = useState("tab tab-bordered relative text-sky-700 border-b-2 border-sky-700 text-3xl"); // Set appropriate class for active state

  // Handler for Clients button click
  const handleShowPatientsReports = () => {
    setShowPatientsReports(true);
    setShowPsychiatristsReports(false);
    setPsychiatristsButtonClass("tab relative text-slate-300 border-b-2 border-slate-300 text-3xl");
    setPatientsButtonClass("tab tab-bordered relative text-sky-700 border-b-2 border-sky-700 text-3xl");
  };

  const handleShowPsychiatristsReports = () => {
    setShowPatientsReports(false);
    setShowPsychiatristsReports(true);
    setPsychiatristsButtonClass("tab tab-bordered relative text-sky-700 border-b-2 border-sky-700 text-3xl");
    setPatientsButtonClass("tab relative text-slate-300 border-b-2 border-slate-300 text-3xl");
  };


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

  const [windowWidth, setWindowWidth] = useState(0);
  // Update window width state on window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Ensure we're in a browser environment before attaching event listener
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth); // Initialize with current window width
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);


  // Helper function to determine if "Time Submitted" should be displayed
  const shouldDisplayTimeSubmitted = () => {
    // Adjust the threshold as needed based on your design
    return windowWidth >= 768; // Only display if window width is greater than or equal to 768px
  };

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

  const returnReportsByPriority = (selectedPriority, reporterType) => {
    let bool = false;
    if (selectedPriority === "") {
      bool = unreadReports;
    } else if (selectedPriority === "High") {
      bool = highPriorityReports;
    } else if (selectedPriority === "Medium") {
      bool = mediumPrioityReports;
    } else if (selectedPriority === "Low") {
      bool = lowPriorityReports;
    } else if (selectedPriority === "Spam") {
      bool = spamReports;
    }

    return (
      <div>
        {bool
          ? reports
            .filter(
              (report) =>
                report.priority === selectedPriority &&
                report.reporter_type === reporterType
            )
            .map((report, index) => (
              <div
                key={report.report_id}
                className="report-card"
                style={{ cursor: "pointer" }}
              >
                <ReportCard
                  key={report.report_id}
                  report={report}
                  onReportClick={handleOpenPopup}
                  windowWidth={windowWidth} // Pass the windowWidth state as a prop
                  showPatientsReports={showPatientsReports} // Pass the showPatientsReports state as a prop
                />

              </div>
            ))
          : null}
      </div>
    );
  };


  const ReportDetailsPopup = () => {
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
    const [isOpen, setIsOpen] = useState(false);

    const dropdownContainerStyle: React.CSSProperties = {
      position: 'absolute',
      top: buttonPosition.top + 35, // Adjusted to position below the button
      left: buttonPosition.left, // Align the left edge of the dropdown with the button
      zIndex: 1001,
      overflow: 'hidden',
    };


    const priorities = ['High', 'Medium', 'Low', 'Spam'];

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

    if (!showPopup) return null;

    const buttonsContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px'
    };

    const cancelButtonStyle = {
      backgroundColor: 'white',
      color: okb_colors.dark_gray,
      padding: '8px 12px',
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
          <div className="flex flex-col gap-3 modal-box p-6" style={{ maxHeight: '50%', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className='flex flex-row justify-between'>
              <h1 className="flex text-xl font-semibold font-montserrat" style={{ fontSize: 20 }}>Report Information</h1>
              <Close className="flex" onClick={handleClosePopup} style={{ cursor: 'pointer' }} />
            </div>
            <div className="space-y-4">
              <ReportPopup key={selectedReport?.report_id} report={selectedReport} showPatientsReports={showPatientsReports} />
            </div>
            <div style={buttonsContainerStyle}>
              <button
                style={cancelButtonStyle}
                className='font-montserrat font-semibold'
                onClick={handleClosePopup}
              >Cancel</button>
              <button
                id="assign-priority-button"
                onClick={toggleDropdown}
                style={assignPriorityButtonStyle}
                className='font-montserrat font-semibold'
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
                    className='font-montserrat font-semibold'
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
          <button onClick={handleShowPatientsReports} className={patientsButtonClass}>
            <span className="relative z-10 font-montserrat font-semibold">Clients</span>
          </button>
          <button onClick={handleShowPsychiatristsReports} className={psychiatristsButtonClass}>
            <span className="relative z-10 font-montserrat font-semibold">Psychiatrists</span>
          </button>
        </div>

        <div className='flex items-center lg:mx-36' style={{ alignSelf: 'stretch', height: 70, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex' }}>
          <div className='flex justify-between items-center w-full px-5 md:px-12' style={{ alignSelf: 'stretch', paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
            {!shouldDisplayTimeSubmitted() && <div className="font-montserrat" style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word', textAlign: 'center', paddingLeft: '5%', paddingRight: '5%' }}>Subject</div>}
            {shouldDisplayTimeSubmitted() && <div className="font-montserrat" style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word', textAlign: 'center', paddingLeft: '5%' }}>Subject</div>}
            {!shouldDisplayTimeSubmitted() && <div className="font-montserrat" style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word', textAlign: 'center', paddingLeft: '4%', paddingRight: '4%' }}>Submitted By</div>}
            {shouldDisplayTimeSubmitted() && <div className="font-montserrat" style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word', textAlign: 'center', paddingLeft: '6%' }}>Submitted By</div>}
            {!shouldDisplayTimeSubmitted() && showPatientsReports && <div className="font-montserrat" style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word', textAlign: 'center', paddingLeft: '1%', paddingRight: '1%' }}>Patient Reported</div>}
            {shouldDisplayTimeSubmitted() && showPatientsReports && <div className="font-montserrat" style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word', textAlign: 'center' }}>Patient Reported</div>}
            {!shouldDisplayTimeSubmitted() && showPsychiatristsReports && <div className="font-montserrat" style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word', textAlign: 'center', paddingLeft: '1%', paddingRight: '1%' }}>Professional Reported</div>}
            {shouldDisplayTimeSubmitted() && showPsychiatristsReports && <div className="font-montserrat" style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word', textAlign: 'center' }}>Professional Reported</div>}
            {shouldDisplayTimeSubmitted() && <div className="font-montserrat" style={{ color: 'black', fontSize: 16, fontWeight: '700', wordWrap: 'break-word', textAlign: 'center' }}>Time Submitted</div>}
          </div>
          <div style={{ alignSelf: 'stretch', height: 0, border: '1.5px black solid' }}></div>
        </div>

      </div>

      <div>
        <div className='flex items-center mx-5 lg:mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div className="font-montserrat" style={{ color: 'black', fontSize: 25, fontWeight: '600', wordWrap: 'break-word', paddingTop: '10px' }}>Unread Reports</div>
          <button onClick={toggleUnreadReports} style={{ marginLeft: '5px' }}>
            {unreadReports ? <ChevronUp color={okb_colors.black} /> : <ChevronDown color={okb_colors.black} />}
          </button>
        </div>

        {showPatientsReports && returnReportsByPriority("", "psychiatrist")}
        {showPsychiatristsReports && returnReportsByPriority("", "patient")}
        <ReportDetailsPopup />

        <div className='flex items-center mx-5 lg:mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div className="font-montserrat" style={{ color: 'black', fontSize: 25, fontWeight: '600', wordWrap: 'break-word' }}>High Priority</div>
          <button onClick={toggleHighPriorityReports} style={{ marginLeft: '5px' }}>
            {highPriorityReports ? <ChevronUp color={okb_colors.black} /> : <ChevronDown color={okb_colors.black} />}
          </button>
        </div>

        {showPatientsReports && returnReportsByPriority("High", "psychiatrist")}
        {showPsychiatristsReports && returnReportsByPriority("High", "patient")}

        <div className='flex items-center mx-5 lg:mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div className="font-montserrat" style={{ color: 'black', fontSize: 25, fontWeight: '600', wordWrap: 'break-word' }}>Medium Priority</div>
          <button onClick={toggleMediumPriorityReports} style={{ marginLeft: '5px' }}>
            {mediumPrioityReports ? <ChevronUp color={okb_colors.black} /> : <ChevronDown color={okb_colors.black} />}
          </button>
        </div>

        {showPatientsReports && returnReportsByPriority("Medium", "psychiatrist")}
        {showPsychiatristsReports && returnReportsByPriority("Medium", "patient")}

        <div className='flex items-center mx-5 lg:mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div className="font-montserrat" style={{ color: 'black', fontSize: 25, fontWeight: '600', wordWrap: 'break-word' }}>Low Priority</div>
          <button onClick={toggleLowPriorityReports} style={{ marginLeft: '5px' }}>
            {lowPriorityReports ? <ChevronUp color={okb_colors.black} /> : <ChevronDown color={okb_colors.black} />}
          </button>
        </div>

        {showPatientsReports && returnReportsByPriority("Low", "psychiatrist")}
        {showPsychiatristsReports && returnReportsByPriority("Low", "patient")}

        <div className='flex items-center mx-5 lg:mx-36' style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <div className="font-montserrat" style={{ color: 'black', fontSize: 25, fontWeight: '600', wordWrap: 'break-word' }}>Spam</div>
          <button onClick={toggleSpamReports} style={{ marginLeft: '5px' }}>
            {spamReports ? <ChevronUp color={okb_colors.black} /> : <ChevronDown color={okb_colors.black} />}
          </button>
        </div>

        {showPatientsReports && returnReportsByPriority("Spam", "psychiatrist")}
        {showPsychiatristsReports && returnReportsByPriority("Spam", "patient")}

      </div>
    </div>
  );
};

export default AdminReport;