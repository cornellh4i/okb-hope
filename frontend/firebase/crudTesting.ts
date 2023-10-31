import { createAppointment, fetchAppointment, updateAppointment, deleteAppointment } from "./IAppointment";
import { createAvailability, fetchAvailability, updateAvailability, deleteAvailability } from "./IAvailability";
import { createUser, fetchUser, updateUser, deleteUser } from "./IUser";
import { createPsychiatrist, fetchPsychiatrist, fetchAllPsychiatrist, updatePsychiatrist, deletePsychiatrist } from "./IPsychiatrist";
import { IAppointment, IAvailability, IPsychiatrist, IUser } from "@/schema";
import { CollectionReference, DocumentData, Timestamp, where } from "firebase/firestore";

export const createTest = async () => {
    const newAvailability: IAvailability = {
        profId: "1",
        startTime: Timestamp.now(),
        endTime: Timestamp.now()
    }

    const newAppointment: IAppointment = {
        profId: "1",
        startTime: Timestamp.now(),
        endTime: Timestamp.now(),
        clientId: "2"
    }

    const newPsych: IPsychiatrist = {
        uid: "1",
        firstName: "John",
        lastName: "Paul",
        position: "idk",
        profile_pic: null,
        availability: [newAvailability],
        gender: 0,
        location: "chicago",
        language: ["english"],
        specialty: [],
        description: "fake psych",
        website: "nonexistent"
    }

    const newPsych2: IPsychiatrist = {
        uid: "2",
        firstName: "El",
        lastName: "Noel",
        position: "idk",
        profile_pic: null,
        availability: [newAvailability],
        gender: 1,
        location: "Jersey",
        language: ["english"],
        specialty: [],
        description: "fake psych",
        website: "nonexistent"
    }

    const newUser: IUser = {
        uid: "1",
        authProvider: "idk",
        email: "fakeemail@.com",
        firstName: "David",
        lastName: "Rodriguez",
        savedPsychiatrists: ["John Paul"], //this should not be a string list...
        age: 20,
        language: ["english"],
        genderPref: 0
    }

    await createAvailability(newAvailability)
    console.log("New availability made")
    await createAppointment(newAppointment)
    console.log("New appointment made")

    await createPsychiatrist(newPsych)
    console.log("New psychiatrist made")
    await createPsychiatrist(newPsych2)
    console.log("New psychiatrist2 made")
    await createUser(newUser)
    console.log("New user made")

    const retrievedAvailabilities = await fetchAvailability([where("profId", "==", "1")]);
    const retrievedAppointments = await fetchAppointment([where("profId", "==", "1")]);

    const retrievedPsych = await fetchPsychiatrist("John", "Paul");
    const retrievedAllPsych = await fetchAllPsychiatrist([]);
    const retrievedUser = await fetchUser([where("ui", "==", "1")])

    console.log("Retrieved availabilities")
    console.log(retrievedAvailabilities)
    console.log("Retrived appointments")
    console.log(retrievedAppointments)

    console.log("Retrieved psych")
    console.log(retrievedPsych)
    console.log("Retrieved all psychs")
    console.log(retrievedAllPsych)
    console.log("Retrived user")
    console.log(retrievedUser)

    const updateAvailability1: IAvailability = {
        profId: "1",
        startTime: Timestamp.now(),
        endTime: Timestamp.now()
    }

    const updateAppointment1: IAppointment = {
        profId: "1",
        startTime: Timestamp.now(),
        endTime: Timestamp.now(),
        clientId: "2"
    }

    const updatedPsych: IPsychiatrist = {
        uid: "1",
        firstName: "John",
        lastName: "Paul",
        position: "idk",
        profile_pic: null,
        availability: [newAvailability],
        gender: 0,
        location: "Paris",
        language: ["english"],
        specialty: [],
        description: "fake psych",
        website: "nonexistent"
    }

    const updatedUser: IUser = {
        uid: "1",
        authProvider: "idk",
        email: "fakeemail@.com",
        firstName: "David",
        lastName: "Rodriguez",
        savedPsychiatrists: ["John Paul"], //this should not be a string list...
        age: 20,
        language: ["english", "spanish"],
        genderPref: 0
    }

    await updateAvailability("IMnyeGm61VxgsDAJt6GH", updateAvailability1)
    console.log("Updated availability")
    await updateAppointment("LSXu8dGfu4v3qKDao8En", updateAppointment1)
    console.log("Updated appointment")

    //I do not know what the id string is for
    await updatePsychiatrist("hi", updatedPsych)
    console.log("Updated Psych 1")
    await updateUser("idk so hi", updatedUser)
    console.log("Updated User")

    await deleteAvailability("IMnyeGm61VxgsDAJt6GH")
    console.log("Deleted availability")
    await deleteAppointment("LSXu8dGfu4v3qKDao8En")
    console.log("Deleted appointment")

    //I do not know what the id string is for still. So idk how to delete --> haven't ran yet
    await deletePsychiatrist("1")
    await deletePsychiatrist("2")
    await deleteUser("1")


}