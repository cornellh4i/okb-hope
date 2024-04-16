import React from 'react';
import AppointmentList from './AppointmentList';
import PsychiatristCardsListing from '../psychiatrists/PsychiatristCardsListing';
import ArticleList from './ArticleList';

const Dashboard = () => {
  return <React.Fragment>
    <div className="container mx-auto">
      <div className="flex flex-row flex-wrap sm:justify-center  py-4">
        <aside className="w-full md:w-1/2 lg:w-1/4 px-2 z-40">
          <div className="sticky top-0 p-1 w-full">
            {/* the side-bar part of dashboard, containing upcoming appointments */}
            <ul className="flex flex-col overflow-hidden shadow-custom-shadow rounded-[6.5px]">
              <AppointmentList />
            </ul>
          </div>
        </aside>
        <main role="main" className="w-full md:w-1/2 lg:w-3/4 pt-1 px-2 z-30">
          {/* main body of dashboard, contains psychiatrist, article cards */}
          <PsychiatristCardsListing max_size={10} />
          <ArticleList />
        </main>
      </div>
    </div>
  </React.Fragment>
}

export default Dashboard;