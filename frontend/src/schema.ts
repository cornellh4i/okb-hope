import { Timestamp } from "firebase/firestore";

enum Gender {
    Male = 0,
    Female = 1
}

export interface IClient {
    name: string;
    gender: string;
    phone_number: string;
    email: string;
    username: string;
    password: string;
    age: number;
}

export interface IPsychiatrist {
    id: number;
    first_name: string;
    last_name: string;
    title: string;
    profile_pic: null;
    availability: string[];
    gender: Gender;
    location: string;
    language: string[];
    specialty: string[];
    description: string;
}

export interface IAppointment {
    id: number,
    name: string,
    start: string,
    end: string,
    description: string
}

// export interface IChat { }

// export interface ICall { }

// export interface ITicket { }

// export interface IResponse { }

export interface IUser {
    active: Timestamp;
    created: Timestamp;
    name: string;
    patient: boolean;
    username: string;
    id: string;
}