import { createAppointment, fetchAppointment, updateAppointment, deleteAppointment } from "./IAppointment";
import { createAvailability, fetchAvailability, updateAvailability, deleteAvailability } from "./IAvailability";
import { createPatient, fetchPatient, updatePatient, deletePatient } from "./IPatient";
import { createPsychiatrist, fetchPsychiatrist, fetchAllPsychiatrist, updatePsychiatrist, deletePsychiatrist } from "./IPsychiatrist";
import { IAppointment, IAvailability, IPsychiatrist, IPatient } from "@/schema";
import { CollectionReference, DocumentData, Timestamp, where } from "firebase/firestore";
import { fetchDocumentId } from "./fetchData";

const PYSCH = "psychiatrists"
const PATIENT = "patients"

export const createAppointments = async () => {
    const newAppointment1: IAppointment = {
        availId: "dgkPWTpDh87X1q18Pa6E",
        appointId: "1",
        profId: "2LSl9NbxLbpTCiOA26Tc",
        startTime: Timestamp.now(),
        endTime: Timestamp.now(),
        patientId: "Gnk4XP77YyfYTFNHL8leVHAmkWM2"
    }

    const newAppointment2: IAppointment = {
        availId: "e0ItZ7laWYZrhyjpTYN8",
        appointId: "1",
        profId: "2LSl9NbxLbpTCiOA26Tc",
        startTime: Timestamp.fromDate(new Date(Timestamp.now().toDate().getTime() - (3 * 24 * 60 * 60 * 1000))),
        endTime: Timestamp.fromDate(new Date(Timestamp.now().toDate().getTime() - (3 * 24 * 60 - 30) * 60 * 1000)),
        patientId: "Gnk4XP77YyfYTFNHL8leVHAmkWM2"
    }

    const newAppointment3: IAppointment = {
        availId: "p2PBckBWo0LEH1QEpMMO",
        appointId: "1",
        profId: "2LSl9NbxLbpTCiOA26Tc",
        startTime: Timestamp.fromDate(new Date(Timestamp.now().toDate().getTime() - (24 * 60 * 60 * 1000))),
        endTime: Timestamp.fromDate(new Date(Timestamp.now().toDate().getTime() - (24 * 60 - 30) * 60 * 1000)),
        patientId: "Gnk4XP77YyfYTFNHL8leVHAmkWM2"
    }

    const newAppointment4: IAppointment = {
        availId: "GRLQn8gE1uWXbMTL0unN",
        appointId: "1",
        profId: "2LSl9NbxLbpTCiOA26Tc",
        startTime: Timestamp.fromDate(new Date(Timestamp.now().toDate().getTime() + (24 * 60 + 30) * 60 * 1000)),
        endTime: Timestamp.fromDate(new Date(Timestamp.now().toDate().getTime() + (24 * 60 + 30) * 60 * 1000)),
        patientId: "Gnk4XP77YyfYTFNHL8leVHAmkWM2"
    }

    await createAppointment(newAppointment1)
    console.log("New appointment made")
    await createAppointment(newAppointment2)
    console.log("New appointment made")
    await createAppointment(newAppointment3)
    console.log("New appointment made")
    await createAppointment(newAppointment4)
    console.log("New appointment made")

}


export const createTest = async () => {
    const newAvailability: IAvailability = {
        availId: "1",
        profId: "1",
        startTime: Timestamp.now(),
        endTime: Timestamp.now()
    }

    const newAppointment: IAppointment = {
        availId: "1",
        appointId: "1",
        profId: "1",
        startTime: Timestamp.now(),
        endTime: Timestamp.now(),
        patientId: "2"
    }

    const newPsych: IPsychiatrist = {
        uid: "1",
        firstName: "John",
        lastName: "Paul",
        position: "idk",
        profile_pic: "",
        weeklyAvailability: ["Monday"],
        workingHours: {},
        gender: 0,
        location: "chicago",
        language: ["english"],
        specialty: [],
        description: "fake psych",
        status: "pending",
        calendly: ""
    }

    const newPsych2: IPsychiatrist = {
        uid: "2",
        firstName: "El",
        lastName: "Noel",
        position: "idk",
        profile_pic: "",
        weeklyAvailability: ["Monday"],
        workingHours: {},
        gender: 1,
        location: "Jersey",
        language: ["english"],
        specialty: [],
        description: "fake psych",
        status: "pending",
        calendly: ""
    }

    const newPatient: IPatient = {
        uid: "1",
        firstName: "David",
        lastName: "Rodriguez",
        email: "fakeemail@.com",
        concerns: ["everything"],
        previousTherapyExperience: "None",
        lastTherapyTimeframe: "Months",
        ageRange: "18-22", //go on the figma and in the login profile it shows ranges not age
        prefLanguages: ["english"],
        gender: 0,
        savedPsychiatrists: ["John Paul"] //this should not be a string list...
    }

    // await createAvailability(newAvailability)
    // console.log("New availability made")
    // await createAppointment(newAppointment)
    // console.log("New appointment made")

    // await createPsychiatrist(newPsych)
    // console.log("New psychiatrist made")
    // await createPsychiatrist(newPsych2)
    // console.log("New psychiatrist2 made")
    // await createPatient(newPatient)
    // console.log("New user made")

    const retrievedAvailabilities = await fetchAvailability([where("profId", "==", "1")]);
    const retrievedAppointments = await fetchAppointment([where("profId", "==", "1")]);

    // const retrievedPsych = await fetchPsychiatrist("John", "Paul");
    const retrievedPsych = await fetchAllPsychiatrist([where("firstName", "==", "John")]);
    const retrievedAllPsych = await fetchAllPsychiatrist([]);
    const retrievedPatient = await fetchPatient([where("uid", "==", "1")])

    console.log("Retrieved psych")
    console.log(retrievedPsych)
    console.log("Retrieved all psychs")
    console.log(retrievedAllPsych)
    console.log("Retrived user")
    console.log(retrievedPatient)

    const updateAvailability1: IAvailability = {
        availId: "dgkPWTpDh87X1q18Pa6E",
        profId: "1",
        startTime: Timestamp.now(),
        endTime: Timestamp.now()
    }

    const updateAppointment1: IAppointment = {
        appointId:"Qsg0uNcxuTP2uofBnhtv",
        availId:"dgkPWTpDh87X1q18Pa6E",
        profId: "1",
        startTime: Timestamp.now(),
        endTime: Timestamp.now(),
        patientId: "2"
    }

    const updatedPsych: IPsychiatrist = {
        uid: "1",
        firstName: "John",
        lastName: "Paul",
        position: "idk",
        profile_pic: "",
        weeklyAvailability: ["Monday"],
        workingHours: {},
        gender: 0,
        location: "Paris",
        language: ["english"],
        specialty: [],
        description: "fake psych",
        status: 'pending',
        calendly: ""
    }

    const updatedPatient: IPatient = {
        uid: "1",
        firstName: "David",
        lastName: "Rodriguez",
        email: "fakeemail@.com",
        concerns: ["everything"],
        previousTherapyExperience: "None",
        lastTherapyTimeframe: "Months",
        ageRange: "18-22",
        prefLanguages: ["english", "spanish"],
        gender: 0,
        savedPsychiatrists: ["John Paul"]
    }
    console.log("Before update")
    console.log(await fetchAvailability([where("profId", "==", "1")]));
    await updateAvailability(updateAvailability1)
    console.log("Updated availability")
    console.log(await fetchAvailability([where("profId", "==", "1")]));

    console.log("Before update")
    console.log(await fetchAppointment([where("profId", "==", "1")]));
    await updateAppointment(updateAppointment1)
    console.log("Updated appointment")
    console.log(await fetchAppointment([where("profId", "==", "1")]));

    const psychDocID = await fetchDocumentId(PYSCH, updatedPsych.uid)
    const psych2DocID = await fetchDocumentId(PYSCH, newPsych2.uid)
    const patientDocID = await fetchDocumentId(PATIENT, updatedPatient.uid)

    console.log(psychDocID)
    await updatePsychiatrist(psychDocID, updatedPsych)

    console.log("Updated Psych 1")
    await updatePatient(patientDocID, updatedPatient)
    console.log("Updated Patient")

    const newAvailability2: IAvailability = {
        availId: "",
        profId: "1",
        startTime: Timestamp.now(),
        endTime: Timestamp.now()
    }

    const newAppointment2: IAppointment = {
        availId: "1",
        appointId: "1",
        profId: "1",
        startTime: Timestamp.now(),
        endTime: Timestamp.now(),
        patientId: "2"
    }


    // DELETE FUNCTION TESTS
    const newObj1 = await createAvailability(newAvailability2)
    console.log("Availability created")
    console.log(await fetchAvailability([where("availId", "==", `${newObj1?.availId}`)]));
    console.log("Delete this availability")
    await deleteAvailability(newObj1)
    console.log(await fetchAvailability([where("availId", "==", `${newObj1?.availId}`)]));

    const newObj2 = await createAppointment(newAppointment2);
    console.log("Appointment created");
    console.log(await fetchAppointment([where("appointId", "==", `${newObj2.appointId}`)]));
    await deleteAppointment(newObj2)
    console.log("Deleted appointment")
    console.log(await fetchAppointment([where("appointId", "==", `${newObj2.appointId}`)]));

    await deletePsychiatrist(psychDocID)
    console.log("Deleted psychiatrist John Paul")
    await deletePsychiatrist(psych2DocID)
    console.log("Deleted psychiatrist El Noel")
    await deletePatient(patientDocID)
    console.log("Deleted patient David Rodriguez")


}