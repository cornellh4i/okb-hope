import CalendarIcon from '@/assets/calendar.svg'
import CameraIcon from '@/assets/calendar.svg'
import ClockIcon from '@/assets/clock.svg'
import Arrow from '@/assets/arrow.svg'

type DropdownProp = {
  img: any,
  text: string,
  select: string
}

/**
 * Creates a template for a dropdown with respect to the booking page
 * @param props contains icon image, text, and select text
 * @returns TSX of a dropdown item
 */
const Dropdown = (props: DropdownProp) => {
  return (
    <div className="dropdown flex-row p-0 gap-5 order-none grow-0 h-70 shadow-md rounded-3xl">
      <label tabIndex={0} className="btn btn-wide btn-ghost rounded-full bg-white text-black shadow-lg">
        <div className="flex  flex-none order-0 grow-0 w-14">
          {props.img}
        </div>
        <div className="flex flex-col items-start p-0 gap-2 normal-case order-1 grow-0 flex-none">
          <div className="flex-none order-0 grow-0">
            {props.text}
          </div>
          <div className="flex flex-row items-center p-0 gap-2 flex-none order-1 grow-0">
            <div className="flex-none order-0 grow-0">
              {props.select}
            </div>
            <Arrow />
          </div>
        </div>
      </label>

      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-64">
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </div>
  )
}

const BookApp = () => {
  return (
    <div className="bg-white p-16">
      <div className="max-w-6xl w-500 mx-auto p-16 bg-[#DEDEDE] shadow-lg rounded-3xl">
        <div className='sm:text-3xl pb-4 gap-8 capitalize pl-6'>
          Book Appointment now
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col items-start p-7 gap-2.5 flex-none order-0 grow-0">
            <Dropdown img={<CalendarIcon className="" viewBox="0 0 48 40" />} text="Appointment Date" select="Select Day" />
          </div>
          <div className="flex flex-col items-start p-7 gap-2.5 flex-none order-1 grow-0">
            <Dropdown img={<ClockIcon className="" viewBox="0 0 48 40" />} text="Appointment Time" select="Select Time" />
          </div>
          <div className="flex flex-col items-start p-7 gap-2.5 flex-none order-2 grow-0">
            <Dropdown img={<CameraIcon className="" viewBox="0 0 48 40" />} text="Video Call" select="Select Platform" />
          </div>
        </div>

        <div className="flex justify-between">
          {/* <div className="flex pl-6">
            <TempCalendar />
          </div> */}
          <div className="flex p-7">
            <button className='rounded-full btn bg-base-100 btn-ghost shadow-lg normal-case text-#[C1C1C1] gap-2.5'>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookApp;