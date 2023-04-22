import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import Navbar from "@/components/navbar/Navbar";

const DashboardPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Dashboard />
        </div>
    );
};

export default DashboardPage;
