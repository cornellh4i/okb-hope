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
    availability: IAvailability[];
    gender: Gender;
    location: string;
    language: string[];
    specialty: string[];
    description: string;
    website: string;
}

export interface IAvailability {
    profId: string;
    startTime: Timestamp;
    endTime: Timestamp;
}


export interface IAppointment extends IAvailability {
    clientId: string;
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