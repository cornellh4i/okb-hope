import Image from 'next/image'
import CalendarIcon from '../Assets/calendar_icon.svg'
import CameraIcon from '../Assets/camera_icon.svg'
import ClockIcon from '../Assets/clock_icon.svg'
import Arrow from '../Assets/arrow.svg'
import TempCalendar from '../Assets/temp_calendar.svg'
// import { Inter } from 'next/font/google'

// const inter = Inter({
//   variable: '--font-inter',
// });

type DropdownProp = {
  img: any,
  text: string,
  select: string
}

function Dropdown(props: DropdownProp) {
  return (
    <div className="dropdown">

      <label tabIndex={0} className="btn btn-wide btn-ghost rounded-full bg-white text-black shadow-lg"> {props.img}  {props.text} <br></br>{props.select} <Arrow /> </label>
      {/* add classnames to label affect individual buttons */}
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><a><div className="">Item 1</div></a></li>
        <li><a>Item 2</a></li>
      </ul>
    </div>
  )
}

// export default function BookApp() {
//   return (
//     <div className="bg-white py-16">
//       <div className="relative flex text-2xl max-w-6xl mx-auto sm:truncate sm:text-3xl sm:tracking-tight flex-col items-center p-16 gap-2.5 bg-[#DEDEDE] shadow-lg rounded-3xl">
//         <div className='container'>
//           Book Appointment Now
//         </div>
//         <div className="flex flex-row">
//           {/* <div className="shadow-lg"></div> */}
//           <div className=""><Dropdown img={<CalendarIcon />} text="Appointment Date" select="Select Day" /></div>
//           <Dropdown img={<ClockIcon />} text="Appointment Time" select="Select Time" />
//           <Dropdown img={<CameraIcon />} text="Video Call" select="Select Platform" />
//         </div>

//         <div className="flex flex-row">
//           <TempCalendar className="" />
//           <button className='rounded-full btn bg-base-100 btn-ghost shadow-lg'><p>Next →</p></button>
//         </div></div></div >
//   )
// }

export default function BookApp() {
  return (
    <div className="bg-white">
      <div className="max-w-6xl w-500 mx-auto p-16 bg-[#DEDEDE] shadow-lg rounded-3xl">
        <div className='sm:text-3xl pb-4'>
          Book Appointment Now
        </div>
        <div className="flex">
          {/* <div className="shadow-lg"></div> */}
          <div className="pr-28 pb-1.5"><Dropdown img={<CalendarIcon />} text="Appointment Date" select="Select Day" /></div>
          <div className="pr-28"><Dropdown img={<ClockIcon />} text="Appointment Time" select="Select Time" /></div>
          <div className=""><Dropdown img={<CameraIcon />} text="Video Call" select="Select Platform" /></div>
        </div>

        <div className="flex flex-row">
          <TempCalendar />
          <div className="pl-80"><button className='rounded-full btn bg-base-100 btn-ghost shadow-lg'>Next →</button></div>
        </div></div></div >
  )
}