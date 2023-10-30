import { createAppointment, fetchAppointment, updateAppointment, deleteAppointment } from "./IAppointment";
import { createAvailability, fetchAvailability, updateAvailability, deleteAvailability } from "./IAvailability";
import { IAppointment, IAvailability } from "@/schema";
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

    await createAvailability(newAvailability)
    console.log("New availability made")
    await createAppointment(newAppointment)
    console.log("New appointment made")

    const retrievedAvailabilities = await fetchAvailability([where("profId", "==", "1")]);
    const retrievedAppointments = await fetchAppointment([where("profId", "==", "1")]);

    console.log("Retrieved availabilities")
    console.log(retrievedAvailabilities)
    console.log("Retrived appointments")
    console.log(retrievedAppointments)

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

    await updateAvailability("IMnyeGm61VxgsDAJt6GH", updateAvailability1)
    console.log("Updated availability")
    await updateAppointment("LSXu8dGfu4v3qKDao8En", updateAppointment1)
    console.log("Updated appointment")

    await deleteAvailability("IMnyeGm61VxgsDAJt6GH")
    console.log("Deleted availability")
    await deleteAppointment("LSXu8dGfu4v3qKDao8En")
    console.log("Deleted appointment")


}