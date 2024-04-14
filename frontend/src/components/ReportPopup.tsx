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
  const formattedDate = report.submittedAt?.toDate ? report.submittedAt.toDate().toLocaleString() : 'Unknown date';


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
        <p style={{ fontSize: 14 }}>The following report for Dr. Gloria Shi was submitted on: {formattedDate}</p>
      </div>
      <p style={{ fontSize: 14 }}>Report Log</p>
      <div>
        <p style={{ fontSize: 14, border: '1px solid #9A9A9A', color: '#000000', padding: '8px 12px' }}>{report.description}</p>
      </div>
      <p style={{ fontSize: 14, textAlign: 'left' }}>Report Status: Verified on {formattedDate}</p>
    </div>
  );
};

export default ReportPopup;