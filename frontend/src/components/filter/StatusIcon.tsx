import React from 'react';

interface StatusIconProps {
    status: 'pending' | 'approved';
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
    if (status === 'pending') {
        return (
            <svg className="status-icon" width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#FFD700" />
                <text x="12" y="17" fontSize="16" fontWeight="bold" textAnchor="middle" fill="white">!</text>
            </svg>
        );
    } else if (status === 'approved') {
        return (
            <svg className="status-icon" width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#4CAF50" />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" />
            </svg>
        );
    } else {
        return null;
    }
}

export default StatusIcon;
