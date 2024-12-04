import React from 'react';
import { useRouter } from 'next/router';
import Bookmark from '@/assets/bookmark.svg';
import SavedBookmark from '@/assets/saved_bookmark.svg';
import Message from '@/assets/message.svg';
import ViewReport from '@/assets/view_reports.svg';
import okb_colors from "@/colors";
import colors from '@/colors';
import { IPsychiatrist } from '@/schema';

interface DiscoverCardProps {
  psychiatrist: IPsychiatrist;
  savedPsychiatrists: string[];
  handleSave: (event: React.MouseEvent, psychiatrist: IPsychiatrist) => void;
  handleSendMessage: (event: React.MouseEvent, psychiatrist: IPsychiatrist) => void;
  handleGoToProfProfile: (psych_uid: string) => void;
  buttonType: string;
}

const DiscoverCard: React.FC<DiscoverCardProps> = ({
  psychiatrist,
  savedPsychiatrists,
  handleSave,
  handleSendMessage,
  handleGoToProfProfile,
  buttonType
}) => {
  const router = useRouter();

  const renderButtons = () => {
    if (buttonType === "report") {
      return (
        <button onClick={() => alert('View Report Popup')}><ViewReport /></button>
      );
    } else {
      return (
        <>
          <button
            className={`btn flex py-2 px-4 justify-center items-center gap-3 rounded-lg bg-[#195BA5] text-[${okb_colors.white}] text-[16px]`}
            onClick={(event) => handleSave(event, psychiatrist)}
          >
            {savedPsychiatrists.includes(psychiatrist.uid) ? <SavedBookmark /> : <Bookmark />}
            <div className='font-montserrat font-semibold'>Save</div>
          </button>
          <button
            className={`btn flex py-2 px-4 justify-center items-center gap-3 rounded-lg bg-[${okb_colors.okb_blue}] text-[${okb_colors.white}] text-[16px]`}
            onClick={(event) => handleSendMessage(event, psychiatrist)}
          >
            <Message />
            <div className='font-montserrat font-semibold'>Message</div>
          </button>
        </>
      );
    }
  };

  return (
    <div
      key={psychiatrist.uid}
      className="psychiatrist w-full"
      onClick={() => handleGoToProfProfile(psychiatrist.uid)}
    >
      <div
        className={`card card-side flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-2.5 rounded-lg bg-[${okb_colors.white}] shadow-[0_0px_5px_0px_rgb(0,0,0,0.15)] p-6 w-full`}
      >
        <div
          className="flex items-center justify-center flex-shrink-0 mb-4 lg:mb-0"
        >
          <div
            style={{ backgroundColor: colors.okb_blue, objectFit: "cover" }}
            className={`w-36 h-36 text-6xl font-normal text-white flex items-center justify-center`}
          >
            {psychiatrist.firstName?.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className={`flex flex-col flex-1 gap-4 w-full h-auto`}>
          <div className={`flex flex-col lg:flex-row justify-between items-center w-full`}>
            <div className={`flex flex-col justify-center lg:items-start items-center gap-2`}>
              <h2 className={`card-title text-[24px] font-montserrat font-semibold`}>
                {psychiatrist.firstName} {psychiatrist.lastName}
              </h2>
              <p className={`text-[16px] font-montserrat font-semibold`}>
                {psychiatrist.position} at {psychiatrist.location}
              </p>
            </div>
            <div className={`flex justify-center lg:justify-end items-center gap-4 w-full lg:w-auto mt-4 lg:mt-0`}>
              {renderButtons()}
            </div>
          </div>
          <div className={`flex w-full justify-center lg:justify-start items-center min-h-[4rem] mt-4 lg:mt-0`}>
            <p
              className={`text-[12px] font-montserrat font-normal overflow-hidden overflow-ellipsis`}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                textAlign: 'left'
              }}
            >
              {psychiatrist.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverCard;
