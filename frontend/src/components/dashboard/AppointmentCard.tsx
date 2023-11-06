import React, {useState, useEffect} from 'react';
import {auth} from '../../../firebase/firebase';
import CalendarIcon from '@/assets/calendar.svg'
import ClockIcon from '@/assets/clock.svg'
import AppointmentQuestion from './AppointmentQuestion'
import Link from 'next/link';
import { fetchPatientDetails } from '../../../firebase/fetchData';
import answers from '@/temp_data/appointment_answers.json'

//structure of dictionary representing each element in the apptQuestions array in "Appointment Details" section
interface ApptQuestion {
  id: string;
  question: string;
  answer: string;
}

const AppointmentCard = ({ p_name, start, end }: { p_name: string, start: Date, end: Date }) => {
  const uid = auth.currentUser?.uid;
  const [apptQuestions, setApptQuestions] = useState<ApptQuestion[]>([]);

  // popoulate Appointment Details questions with data from Patient's profile
  const populateApptQuestions = async () => {
    if (uid) {
      const data = await fetchPatientDetails(uid);
      const updatedApptQuestions: ApptQuestion[] = [
        {
          "id": "input1",
          "question": "Are there any specific concerns you would like to discuss with your counselor?",
          "answer": data.concerns
        },
        {
          "id": "input2",
          "question": "Have you spoken with a counselor/therapist before?",
          "answer": data.previousTherapyExperience
        },
        {
          "id": "input3",
          "question": "If yes, when was the last time you spoke with one?",
          "answer": data.lastTherapyTimeframe
        },
        {
          "id": "input4",
          "question": "What is your age?",
          "answer": data.ageRange
        },
        {
          "id": "input5",
          "question": "What kind of counselor do you want to speak with?",
          "answer": data.genderPref === 1 ? "Female" : "Male"
        },
        {
          "id": "input6",
          "question": "What is your preferred language?",
          "answer": data.prefLanguages.join(', ')
        }
      ];
      // Set the state with the updated array
      setApptQuestions(updatedApptQuestions);
    }
  };

  useEffect(() => {
    populateApptQuestions();
    
  }, [uid]);
  
  // calculation of # days remaining until appt
  const daysTo = Math.floor((start.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const month = start.toLocaleString('default', { month: 'long' });
  const day = start.toLocaleString('default', { weekday: 'long' });
  const [showModal, setShowModal] = React.useState(false);

  return (
    <React.Fragment>
      <div className="card w-11/12 bg-base-100 mt-4 shadow-xl border-[3px] border-[#519AEB]">
        <div className="card-body p-4">
          <p className="text-[12px]">In {daysTo} days</p>
          <h2 className="card-title text-[16px] font-[600]">Meeting with {p_name}</h2>
          <div className="grid grid-cols-4 grid-rows-2 gap-1 items-center pb-1/12">
            {/* row 1: day, date of appointment */}
            <div className="col-span-1 shrink"><CalendarIcon></CalendarIcon></div>
            <div className="col-span-3 text-[12px]"><p>{day}, {month} {start.getDay()}</p></div>
            {/* row 2: time of appointment */}
            <div className="col-span-1 shrink"><ClockIcon></ClockIcon></div>
            {/* calculation of appointment time */}
            <div className="col-span-3 text-[12px]"><p>{start.getHours()}:{start.getMinutes()} - {end.getHours()}:{end.getMinutes()}</p></div>
          </div>

          <button className="btn w-12/12 bg-okb-blue border-transparent font-[400]" onClick={() => setShowModal(true)}> Appointment Details</button>
          {showModal ? (
            // appointment details pop-up card
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-bold">
                        Meeting with {p_name}
                      </h3>
                      <br></br>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <div className="col-span-4"><p>{day}, {month} {start.getDay()}</p></div>
                      <div className="col-span-4"><p>{start.getHours()}:{start.getMinutes()} - {end.getHours()}:{end.getMinutes()}</p></div>
                      <br></br>
                      {/* button to start appointment */}
                      <Link href="./video-chat">
                        <button
                          className="bg-slate-200 text-black active:bg-gray-500 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full"
                          type="button"
                        >
                          Start Appointment
                        </button>
                      </Link>
                      <br></br>
                      <br></br>
                      {/* reschedule button */}
                      <div className="flex space-x-10">
                        <button
                          className="bg-slate-50 text-black active:bg-gray-500 text-sm px-6 py-3 rounded shadow hover:shadow-lg focus: mr-1 mb-1 ease-linear transition-all duration-150 w-1/2 outline outline-offset-2 outline-1 rounded-lg"
                          type="button"
                        >
                          Reschedule Appointment
                        </button>
                        {/* delete appt button */}
                        <button
                          className="bg-slate-50 text-black active:bg-gray-500 text-sm px-6 py-3 rounded shadow hover:shadow-lg focus: mr-1 mb-1 ease-linear transition-all duration-150 w-1/2 outline outline-offset-2 outline-1 rounded-lg"
                          type="button"
                        >
                          Delete Appointment
                        </button>
                      </div>
                      <br></br>
                      {/* questionnaire answers: map each JSON object to each individual Appointment Question */}
                      {apptQuestions.map(input => (
                        
                        <div key={input.id.toString()} className="appointment_question">
                          <AppointmentQuestion value={input.answer.toString()} name={input.id.toString()} question={input.question.toString()}></AppointmentQuestion>
                        </div>
                      ))}
                    </div>
                    {/* button to close pop-up */}
                    <button
                      className="absolute top-0 right-0 h-16 w-16 text-black-800 background-transparent font-bold uppercase px-6 py-2 text-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};


export default AppointmentCard;