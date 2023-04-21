import React from 'react';
import AppointmentList from './AppointmentList';
import PsychiatristList from '../psychiatrists/PsychiatristList';
import ArticleList from './ArticleList';

const Dashboard = () => {
  return <div>
    <AppointmentList />
    <PsychiatristList max_size={10} />
    <ArticleList />
  </div>
}

export default Dashboard;