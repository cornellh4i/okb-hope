import { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import okb_colors from '../../colors'
import { Timestamp } from 'firebase/firestore';
import { fetchPatientDetails } from '../../../firebase/fetchData';
import { IPatient } from '@/schema';
import Link from 'next/link';
import AppointmentQuestion from '../dashboard/AppointmentQuestion';

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
          "question": "Are there any specific concerns you would like to discuss with your counselor?",
          "answer": data.concerns.join(', ')
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
          "question": "What is your gender?",
          "answer": data.gender === 0 ? "Male" : (data.gender === 1 ? "Female" : "Other")
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

  }, [patientId]);

  const formattedStartTime = dayjs(startTime).format('HH:mm');
  const formattedEndTime = dayjs(endTime).format('HH:mm');
  const day = dayjs(startTime).format('D');
  const month = dayjs(startTime).format('MMMM');
  const dayOfWeek = dayjs(startTime).format('dddd');

  return (
    patient ?
      <div className="flex w-full h-[67px] rounded-[10px] items-center py-2 px-10 shadow mt-6 mb-0 gap-2.5 inline-flex justify-center">
        <div className="flex flex-row sm:flex-row md:flex-col lg:flex-row justify-between items-start w-full">
          <div className="justify-center items-center gap-6 flex">
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
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto h-2/3 my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-bold">
                            Meeting with {patient?.firstName + " " + patient?.lastName}
                          </h3>
                          <br></br>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <div className="col-span-4"><p>{dayOfWeek}, {month} {day} • {formattedStartTime} - {formattedEndTime}</p></div>
                          {/* <div className="col-span-4"><p>{startTime.getHours()}:{(startTime.getMinutes() < 10 ? '0' : '') + startTime.getMinutes()} - {endTime.getHours()}:{(endTime.getMinutes() < 10 ? '0' : '') + endTime.getMinutes()}</p></div> */}
                          <br></br>
                          {/* button to start appointment */}
                          {/* <div className='flex flex-col justify-center items-center'> */}
                          <Link href="./video-chat">
                            <button
                              className="mb-4 bg-[#519AEB] text-[#FFFDFD] active:bg-gray-500 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full"
                              type="button"
                            >
                              Start Appointment
                            </button>
                          </Link>
                          {/* reschedule button */}
                          <div className="flex space-x-4">
                            <button
                              className="text-[#5F5F5F] active:bg-gray-500 text-sm rounded shadow hover:shadow-lg focus: mr-1 mb-1 ease-linear transition-all duration-150 w-1/2"
                              type="button"
                              style={{ width: '50%', height: '100%', paddingLeft: 30, paddingRight: 30, paddingTop: 12, paddingBottom: 12, borderRadius: 10, border: '3px #519AEB solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}
                            >
                              Reschedule Appointment
                            </button>
                            {/* delete appt button */}
                            <button
                              className="text-[#5F5F5F] active:bg-gray-500 text-sm rounded shadow hover:shadow-lg focus: mr-1 mb-1 ease-linear transition-all duration-150 w-1/2"
                              type="button"
                              style={{ width: '50%', height: '100%', paddingLeft: 30, paddingRight: 30, paddingTop: 12, paddingBottom: 12, borderRadius: 10, border: '3px #519AEB solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}
                            >
                              Delete Appointment
                            </button>
                          </div>
                          {/* </div> */}

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
                  <div className="bg-black opacity-25 fixed inset-0"></div>
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