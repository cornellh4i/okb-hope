import Image from 'next/image'
import CalendarIcon from '../Assets/calendar_icon.svg'
import CameraIcon from '../Assets/camera_icon.svg'
import ClockIcon from '../Assets/clock_icon.svg'
import Arrow from '../Assets/arrow.svg'
import TempCalendar from '../Assets/temp_calendar.svg'

type DropdownProp = {
  img: any,
  text: string,
  select: string
}

function Dropdown(props: DropdownProp) {
  return (
    <div className="dropdown">

      <label tabIndex={0} className="btn m-1 btn-ghost rounded-full bg-white text-black shadow-lg"> {props.img}  {props.text} <br></br>{props.select} <Arrow /> </label>
      {/* add classnames to label affect individual buttons */}
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
      </ul>
    </div>
  )
}

export default function BookApp() {
  return (
    <div className="bg-white py-16">
      <div className="flex text-2xl max-w-6xl mx-auto sm:truncate sm:text-3xl sm:tracking-tight flex-col items-center p-16 gap-2.5 bg-[#DEDEDE] shadow-lg rounded-3xl">
        <div className='container'>
          <p className="font-bold">
            Book Appointment Now
          </p>
        </div>
        <div className="flex flex-row">
          {/* <div className="shadow-lg"></div> */}
          <Dropdown img={<CalendarIcon />} text="Appointment Date" select="Select Day" />
          <Dropdown img={<ClockIcon />} text="Appointment Time" select="Select Time" />
          <Dropdown img={<CameraIcon />} text="Video Call" select="Select Platform" />
        </div>

        <div className="flex flex-row">
          <TempCalendar />
          <button className='rounded-full btn bg-base-100 btn-ghost shadow-lg'><p>Next →</p></button>
        </div></div></div >
  )
}