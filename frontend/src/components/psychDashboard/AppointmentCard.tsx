import { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import okb_colors from '../../colors'
import { Timestamp } from 'firebase/firestore';
import { fetchPatientDetails } from '../../../firebase/fetchData';
import { IPatient } from '@/schema';
import Link from 'next/link';
import AppointmentQuestion from '../dashboard/AppointmentQuestion';
import ChatIcon from '@/assets/chat_icon.svg';

interface ApptQuestion {
  id: string;
  question: string;
  answer: string;
}

const AppointmentCard = ({ patientId, startTime, endTime }: { patientId: string, startTime, endTime }) => {
  const [isShown, setIsShown] = useState(false);
  const [patient, setPatient] = useState<IPatient>();
  const [showModal, setShowModal] = useState(false);
  const [apptQuestions, setApptQuestions] = useState<ApptQuestion[]>([]);
  const handleClick = event => {
    setIsShown(!isShown);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (patientId) {
        const data = await fetchPatientDetails(patientId);
        setPatient(data);
      }
    }
    fetchUser();
  }, []);

  // popoulate Appointment Details questions with data from Patient's profile
  const populateApptQuestions = async () => {
    if (patientId) {
      const data = await fetchPatientDetails(patientId);
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

  }, [patientId]);

  const formattedStartTime = dayjs(startTime).format('HH:mm');
  const formattedEndTime = dayjs(endTime).format('HH:mm');
  const day = dayjs(startTime).format('D');
  const month = dayjs(startTime).format('MMMM');
  const dayOfWeek = dayjs(startTime).format('dddd');

  return (
    patient ?
      <div className="flex w-full rounded-[10px] items-center py-4 px-10 shadow mt-6 mb-0 gap-2.5 inline-flex justify-center">
        <div className="flex flex-wrap justify-between items-start w-full gap-y-3 p-2">
          <div className="justify-center items-center gap-6 flex mr-4">
            <div className="text-black font-montserrat text-xs font-normal">{formattedStartTime} - {formattedEndTime}</div>
            <div className="text-black font-montserrat text-base font-semibold">{patient?.firstName + " " + patient?.lastName}</div>
          </div>

          {/* appointment details button */}
          <div className={`flex py-1 px-2 justify-center items-center gap-4 rounded-[15px] border border-solid`} style={{ borderColor: okb_colors.light_blue }}>
            <div className="card-actions flex py-0.5 px-2 flex-col items-start gap-2.5 justify-start rounded">
              <button className="font-montserrat text-xs font-normal" onClick={() => setShowModal(true)}>Appointment Details</button>
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
                              Meeting with {patient?.firstName + " " + patient?.lastName} <ChatIcon></ChatIcon>
                            </h3>
                            <div className="col-span-4 text-[#5F5F5F] font-montserrat">
                              <div className="col-span-4"><p>{dayOfWeek}, {month} {day} <span style={{ padding: '0 1rem' }}>•</span> {formattedStartTime} - {formattedEndTime}</p></div>
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
        </div>
      </div>
      : null
  )
};

export default AppointmentCard;