import React from 'react';
import AppointmentList from './AppointmentList';
import PsychiatristList from '../psychiatrists/PsychiatristCardsListing';
import ArticleList from './ArticleList';

const Dashboard = () => {
  return <div>
    <div className="container mx-auto">
      <div className="flex flex-row flex-wrap py-4">
        <aside className="w-full sm:w-1/4 md:w-1/4 px-2">
          <div className="sticky top-0 p-1 w-full">

            <ul className="flex flex-col overflow-hidden">
              <AppointmentList />
            </ul>
          </div>
        </aside>
        <main role="main" className="w-full sm:w-3/4 md:w-3/4 pt-1 px-2">

          <PsychiatristList max_size={10} />
          <ArticleList />
        </main>
      </div>
    </div>
  </div>
}

export default Dashboard;