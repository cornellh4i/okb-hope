import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { db } from '../..//firebase/firebase';
import Link from 'next/link';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { IPsychiatrist, IReport } from '@/schema';
import ViewReport from '@/assets/view_reports.svg';
import Close from '@/assets/close.svg';
import okb_colors from "@/colors";
import { fetchPatientReports } from '../../firebase/fetchData';

const ReportPopup = ({ report }) => {
  // const formattedDate = report.submittedAt.toDate().toLocaleString();
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
    <div style={cardStyle} className="card bg-base-100  mb-4">
      <div>
        <h2 style={{ marginBottom: '10px' }} className="font-bold">Submitted By: <span className="font-normal">{report.reporter_name}</span> </h2>
        <h2 style={{ marginBottom: '10px' }} className="font-bold">Person Reported: <span className="font-normal">{report.reporter_name}</span> </h2>
        <h2 style={{ marginBottom: '10px' }} className="font-bold">Submitted On: <span className="font-normal">{formattedDate}</span></h2>
        <p style={{ fontSize: '14px', border: '1px solid #c7c5c5', color: '#000000', padding: '8px 12px' }} className="font-normal"> {report.description}</p>
      </div>
    </div>
  );
};

export default ReportPopup;