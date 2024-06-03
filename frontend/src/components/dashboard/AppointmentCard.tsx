import React, { useState, useEffect } from 'react';
import { auth } from '../../../firebase/firebase';
import CalendarIcon from '@/assets/calendar.svg'
import ClockIcon from '@/assets/clock.svg'
import ChatIcon from '@/assets/chat_icon.svg'
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
          "question": "What is your gender?",
          "answer": data.gender === 0 ? "Male" : (data.gender === 1 ? "Female" : "Other")
        },
        {
          "id": "input2",
          "question": "What is your age?",
          "answer": data.ageRange
        },
        {
          "id": "input3",
          "question": "What are your preferred language(s)?",
          "answer": data.prefLanguages.join(', ')
        },
        {
          "id": "input4",
          "question": "Have you spoken with a counselor/therapist before?",
          "answer": data.previousTherapyExperience
        },
        {
          "id": "input5",
          "question": "When was the last time you spoke with one?",
          "answer": data.lastTherapyTimeframe
        },
        {
          "id": "input6",
          "question": "Are there any specific concerns you would like to discuss with your counselor?",
          "answer": data.concerns.join(', ')
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
          {daysTo > 2 ? (
            <p className="text-[12px] font-montserrat">In {daysTo} days</p>
          ) : daysTo == 1 ? (
            <p className="text-[12px] font-montserrat">Tomorrow</p>
          ) : <p className="text-[12px] font-montserrat">Today</p>}
          <h2 className="card-title text-[16px] font-[600] font-montserrat">Meeting with {p_name}</h2>
          <div className="grid grid-cols-4 grid-rows-2 gap-1 items-center pb-1/12">
            {/* row 1: day, date of appointment */}
            <div className="col-span-1 shrink"><CalendarIcon></CalendarIcon></div>
            <div className="col-span-3 text-[12px] font-montserrat"><p>{day}, {month} {start.getDate()}</p></div>
            {/* row 2: time of appointment */}
            <div className="col-span-1 shrink"><ClockIcon></ClockIcon></div>
            {/* calculation of appointment time */}
            <div className="col-span-3 text-[12px] font-montserrat"><p>{start.getHours()}:{(start.getMinutes() < 10 ? '0' : '') + start.getMinutes()} - {end.getHours()}:{(end.getMinutes() < 10 ? '0' : '') + end.getMinutes()}</p></div>
          </div>

          <button className="btn w-12/12 bg-okb-blue border-transparent font-[400] font-montserrat" onClick={() => setShowModal(true)}> Appointment Details</button>
          {showModal ? (
            // appointment details pop-up card
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto h-2/3 my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg p-9 shadow-lg relative flex flex-col gap-8 w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className='flex flex-col gap-4'>
                      <div className="flex flex-col gap-2 items-start justify-between rounded-t">
                        <h3 className="flex flex-wrap gap-4 text-3xl font-semibold font-montserrat">
                          Meeting with {p_name} <ChatIcon></ChatIcon>
                        </h3>
                        <div className="col-span-4 text-[#5F5F5F] font-montserrat">
                          <p>
                            {day}, {month} {start.getDate()}
                            <span style={{ padding: '0 1rem' }}>•</span>
                            {start.getHours()}:{(start.getMinutes() < 10 ? '0' : '') + start.getMinutes()} - {end.getHours()}:{(end.getMinutes() < 10 ? '0' : '') + end.getMinutes()}
                          </p>
                        </div>
                      </div>
                      {/*body*/}
                      <div className="flex flex-col gap-2">
                        {/* button to start appointment */}
                        <Link href="./video-chat">
                          <button
                            className="bg-[#519AEB] font-montserrat font-semibold text-[#FFFDFD] active:bg-gray-500 text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 w-full"
                            type="button"
                            style={{ borderRadius: 10 }}
                          >
                            Start Appointment
                          </button>
                        </Link>
                        {/* Reschedule and delete appointment buttons */}
                        <div className="flex flex-row gap-2">
                          <button
                            className="text-[#5F5F5F] font-montserrat font-semibold active:bg-gray-500 text-sm rounded shadow hover:shadow-lg focus: ease-linear transition-all duration-150 w-1/2"
                            type="button"
                            style={{ width: '50%', height: '100%', paddingLeft: 30, paddingRight: 30, paddingTop: 12, paddingBottom: 12, borderRadius: 10, border: '3px #519AEB solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}
                          >
                            Reschedule Appointment
                          </button>
                          <button
                            className="text-[#5F5F5F] font-montserrat font-semibold active:bg-gray-500 text-sm rounded shadow hover:shadow-lg focus: ease-linear transition-all duration-150 w-1/2"
                            type="button"
                            style={{ width: '50%', height: '100%', paddingLeft: 30, paddingRight: 30, paddingTop: 12, paddingBottom: 12, borderRadius: 10, border: '3px #519AEB solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}
                          >
                            Delete Appointment
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* questionnaire answers: map each JSON object to each individual Appointment Question */}
                    <div className='flex flex-col gap-y-8'>
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