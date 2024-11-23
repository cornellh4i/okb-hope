import React, { useState, useEffect } from 'react';
import AppointmentList from './AppointmentList';
import PsychiatristCardsListing from '../psychiatrists/PsychiatristCardsListing';
import ArticleList from './ArticleList';
import { fetchProfilePic } from '../../../firebase/firebase';

const Dashboard = () => {
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadProfilePic = async () => {
      if (user?.uid) {
        const picUrl = await fetchProfilePic(user.uid);
        setProfilePicUrl(picUrl);
      }
    };
    loadProfilePic();
  }, [user]);

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
          <div className="flex items-center justify-center">
            {profilePicUrl ? (
              <img 
                src={profilePicUrl}
                alt="Profile Picture"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div 
                style={{ backgroundColor: colors.okb_blue }} 
                className="w-32 h-32 rounded-full text-4xl font-normal text-white flex items-center justify-center"
              >
                {user?.firstName?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <PsychiatristCardsListing max_size={10} />
          <ArticleList />
        </main>
      </div>
    </div>
  </React.Fragment>
}

export default Dashboard;