import Left_Arrow from '../assets/left_arrow.svg'
import Link_Icon from '../assets/link_icon.svg'
import Saved from '../assets/saved.svg'
import Message from '../assets/message.svg'
import Unsaved from '../assets/unsaved.svg'
import Image from '../assets/dummy_img.png'
import { useState } from 'react';
import Link from 'next/link';
import TimeTable from './TimeTable'

// const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

interface Props {
  name: string,
  description: string,
  title: string,
  gender: string,
  languages: string[],
  // photo_id: Element,
  photo_id: string,
  link: string,
  certifications: string,
  times: any;
}

const Pro_Profile: React.FC<Props> = ({ name, description, title, gender, languages, photo_id, link, times, certifications }) => {

  let languagesList: JSX.Element[] = [];

  languages.forEach((language) => {
    languagesList.push(<div className="badge badge-outline">{language}</div>);
  });


  // let daysList: JSX.Element[] = [];

  // days.forEach((day) => {
  //   daysList.push(<div className="card shadow-xl">
  //     <div className="card-body">
  //       <h2 className="card-title">{day}</h2>
  //     </div>
  //   </div>)
  // });

  const [saved, setSaved] = useState(false);

  function toggleSaved() {
    setSaved(!saved);
  }

  return (
    <div>

      <div>
        <Link href="/">
          <Left_Arrow />
        </Link>
      </div>

      <div className="flex flex-row">
        <div>
          <img src={Image.src} alt="Dummy Image" style={{ width: '800px', height: '350px' }} />
        </div>
        <div>
          <div className="flex flex-row">
            <div>
              <div className="flex flex-col">
                <p className='sm:text-3xl'>
                  {title}{name}
                </p>
                <p className="italic font-thin">
                  {certifications}
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-row">
                <button className="btn col-span-1 bg-[#E5E5E5] text-[#9A9A9A] text-[16px] flex space-x-3" onClick={toggleSaved}>
                  {saved ? <Saved /> : <Unsaved />}
                  <p>{saved ? 'Saved' : 'Save'}</p>
                </button>
                <button className="btn col-span-1 bg-[#E5E5E5] text-[#9A9A9A] text-[16px] flex space-x-3">
                  <Message />
                  <Link href="/">
                    Message
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="badge badge-outline">
              {gender}
            </div>
            <div>{languagesList}</div>
          </div>
          <div className=''>
            {description}
          </div>
          <button className="btn btn-outline bg-[#E5E5E5]">
            <Link href={link} className="w-18 flex items-center">
              <Link_Icon /> {link}
            </Link>
          </button>
        </div>
      </div>
      <div>
        <p className='sm:text-3xl'>
          Availability
        </p>
        <div className='flex'><TimeTable times={times}></TimeTable></div>
        <button className="btn col-span-1 text-[16px] flex space-x-3 bg-white text-black border-gray-400">
          <div>Book Appointment</div>
        </button>
      </div>
    </div >
  );

}

export default Pro_Profile
