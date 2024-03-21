import { db } from './firebase';
import { getDocs, query, where, collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { IAppointment, IAvailability, IPatient, IPsychiatrist, IUser } from '@/schema';
import { useAuth } from '../contexts/AuthContext';

