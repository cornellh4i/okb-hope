import Left_Arrow from '../assets/left_arrow.svg'
import Link_Icon from '../assets/link_icon.svg'
import Saved from '../assets/saved.svg'
import Message from '../assets/message.svg'
import Unsaved from '../assets/unsaved.svg'
import { useState } from 'react';
import Link from 'next/link';

interface Props {
  name: string,
  description: string,
  title: string,
  gender: string,
  languages: string[],
  photo_id: string,
  link: string,
  certifications: string,
  times: any;
}

const Pro_Profile: React.FC<Props> = ({ name, description, title, gender, languages, photo_id, link, times, certifications }) => {

  let tagsList: JSX.Element[] = [];

  tagsList.push(<div className="badge badge-outline">{gender}</div>)

  languages.forEach((language) => {
    tagsList.push(<div className="badge badge-outline">{language}</div>);
  });

  const [saved, setSaved] = useState(false);

  function toggleSaved() {
    setSaved(!saved);
  }

  return (
    <div>

      <div className='pl-4 py-4'>
        <Link href="/">
          <Left_Arrow />
        </Link>
      </div>
      
      <div className="flex justify-center">
      <div className="card card-side bg-base-100 justify-self-center w-3/4">
        <div className='w-full'>
          <figure><img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt="dummy_prof" style={{ width: '300px', height: '300px' }}/></figure>
        </div>
        <div className="card-body">
          <div className="flex flex-row gap-8">
            <h2 className="card-title text-4xl">Erica Jameson</h2>
            <div className='card-actions justify-end'>
              <button className="btn bg-[#E5E5E5] text-[#9A9A9A] text-[16px] space-x-3 " onClick={toggleSaved}>
                {saved ? <Saved /> : <Unsaved />}
                <p>{saved ? 'Saved' : 'Save'}</p>
              </button>
              <button className="btn bg-[#E5E5E5] text-[#9A9A9A] text-[16px] space-x-3">
                  <Message />
                  <Link href="/">
                    Message
                  </Link>
              </button>
            </div>
          </div>
          <p className="italic font-thin">
                  {certifications}
          </p>
          <div>{tagsList}</div>
          <div>Intro Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</div>
          
          <div>
          <button className="btn btn-outline bg-[#E5E5E5]">
            <Link href={link} className="w-18 flex items-center gap-4">
              <Link_Icon /> {link}
            </Link>
          </button>
          </div>

        </div>
      </div>
      </div>
      <div>
      <div className="flex justify-center">
      <div className="card card-side bg-base-100 justify-self-center w-3/4">
        <div className='sm:text-3xl'>
          Availability
        </div>
      </div>
      </div>

      <div className="flex justify-center">
      <div className="card bg-base-100 justify-self-center w-3/4">
        <div className='grid grid-flow-row-dense grid-cols-7 gap-2'>
        
        <div className="card shadow-xl rounded-3xl">
          <div className="card-body">
            <h2 className={`card-title justify-left text-[#9A9A9A]' : ''}`}>
              Monday
            </h2>
              <div className='text-xs'>10:00 - 12:00</div>
              <div className='text-xs'>15:00 - 17:00</div>
          </div>
        </div>

        <div className="card shadow-xl rounded-3xl">
          <div className="card-body">
            <h2 className={`card-title text-[#9A9A9A]' : ''}`}>
              Tuesday
            </h2>
              <div className='text-xs'>15:00 - 17:00</div>
          </div>
        </div>

        <div className="card shadow-xl rounded-3xl">
          <div className="card-body">
            <h2 className={`card-title justify-center text-[#9A9A9A]' : ''}`}>
              Wednesday
            </h2>
              <div className='text-xs'>13:00 - 15:00</div>
              <div className='text-xs'>16:00 - 18:00</div>
          </div>
        </div>

        <div className="card shadow-xl rounded-3xl">
          <div className="card-body">
            <h2 className={`card-title text-[#9A9A9A]': ''}`}>
              Thursday
            </h2>
              <div className="text-[#9A9A9A] text-xs">No Times Available</div>
          </div>
        </div>

        <div className="card shadow-xl rounded-3xl">
          <div className="card-body">
            <h2 className={`card-title text-[#9A9A9A]' : ''}`}>
              Friday
            </h2>
              <div className='text-xs'>9:00 - 15:00</div>
              <div className='text-xs'>16:00 - 18:00</div>
          </div>
        </div>

        <div className="card shadow-xl rounded-3xl">
          <div className="card-body">
            <h2 className={`card-title text-[#9A9A9A]' : ''}`}>
              Saturday
            </h2>
              <div className='text-xs'>10:00 - 14:00</div>
              <div className='text-xs'>16:00 - 18:00</div>
          </div>
        </div>

        <div className="card shadow-xl rounded-3xl">
          <div className="card-body">
            <h2 className={`card-title text-[#9A9A9A]' : ''}`}>
              Sunday
            </h2>
              <div className="text-[#9A9A9A] text-xs">No Times Available</div>
          </div>
        </div>
        </div>
        </div>
        </div>

        <div className='flex justify-center py-12'>
          <button className="btn col-span-1 text-[16px] flex space-x-3 bg-white text-black border-gray-400">
            <div>Book Appointment</div>
          </button>
        </div>
      </div>
    </div >
  );

}

export default Pro_Profile

