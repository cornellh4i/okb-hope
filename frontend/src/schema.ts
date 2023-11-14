import { Timestamp } from "firebase/firestore";

enum Gender {
    Male = 0,
    Female = 1
}

export interface IPsychiatrist {
    uid: string;
    firstName: string;
    lastName: string;
    position: string;
    profile_pic: null;
    availability: string[]; //changed to string so it just stores the availability doc id
    gender: Gender;
    location: string;
    language: string[];
    specialty: string[];
    description: string;
    website: string;
}

export interface IPatient {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    concerns: string;
    previousTherapyExperience: string;
    lastTherapyTimeframe: string;
    ageRange: string;
    prefLanguages: string[];
    genderPref: Gender;
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
    savedPsychiatrists: string[];
    age: number;
    language: string[];
    genderPref: Gender;
}

