import React from 'react';
import AppointmentList from './AppointmentList';
import PsychiatristList from './PsychiatristList';
import ArticleList from './ArticleList';

const Dashboard = () => {
  return <div>
    <AppointmentList />
    <PsychiatristList max_size={10} />
    <ArticleList />
  </div>
}

export default Dashboard;