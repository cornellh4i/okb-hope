import { db } from './firebase';
import { getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc, doc, QueryConstraint, query } from "firebase/firestore";
import { IUser } from '@/schema';

const USER = "User";

const createUser = async (user: IUser): Promise<void> => {
    try {
        await addDoc(collection(db, USER), user);
    } catch (error) {
        console.error("Error adding user entry: ", error);
    }
}

  
  const fetchUser = async (constraints: QueryConstraint[]): Promise<IUser[] | null> => {
    try {
        const baseQuery = collection(db, USER);
        const q = query(baseQuery, ...constraints);
        const querySnapshot = await getDocs(q);

        const users: IUser[] = [];
        querySnapshot.forEach(doc => {
            users.push(doc.data() as IUser);
        });

        return users;
    } catch (error) {
        console.error("Error fetching user entry: ", error);
        return null;
    }
}


const updateUser = async (id: string, updatedUser: Partial<IUser>): Promise<void> => {
    try {
        const userRef = doc(db, USER, id);
        await updateDoc(userRef, updatedUser);
    } catch (error) {
        console.error("Error updating user entry: ", error);
    }
}

const deleteUser = async (id: string): Promise<void> => {
    try {
        const userRef = doc(db, USER, id);
        await deleteDoc(userRef);
    } catch (error) {
        console.error("Error deleting user entry: ", error);
    }
}

export { createUser, fetchUser, updateUser, deleteUser };