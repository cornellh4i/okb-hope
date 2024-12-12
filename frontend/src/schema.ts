import { Timestamp } from "firebase/firestore";

export enum Gender {
    Male = 0,
    Female = 1,
    Other = 2
}

export interface IPsychiatrist {
    uid: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    position: string;
    location: string;
    profile_pic: string;
    description: string;
    language: string[];
    weeklyAvailability: string[];
    workingHours: object;
    specialty: string[];
    status: string;
    calendly: string;
}

export interface IPatient {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    concerns: string[];
    previousTherapyExperience: string;
    lastTherapyTimeframe: string;
    ageRange: string;
    prefLanguages: string[];
    gender: Gender;
    savedPsychiatrists: string[];
}

export interface IAvailability {
    availId: string;
    profId: string;
    startTime: Timestamp;
    endTime: Timestamp;
}


export interface IAppointment extends IAvailability {
    appointId: string;
    patientId: string;
}

export interface IUser {
    uid: string;
    authProvider: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    language: string[];
    genderPref: Gender;
    userType: string;
}

export interface IReport {
    description: string;
    patient_id: string;
    patient_name: string;
    psych_id: string;
    // psych_name: string;
    report_id: string;
    submittedAt: Timestamp;
    priority: string;
    reporter_name: string;
    reporter_type: string;
}

