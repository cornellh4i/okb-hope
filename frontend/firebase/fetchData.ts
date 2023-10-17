
import { getDocs, collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "./firebase"

function fetchUserChats(setMessages) {
  // const userId = auth.currentUser?.uid;
  const userId = "123"

  if (!userId) {
    console.error("No user is authenticated.");
    return () => { }; // Return an empty function for consistent return type
  }

  const conversationsRef = collection(db, "conversations");
  const q = query(conversationsRef, where("participants", "array-contains", userId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const userConversations = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));
    setMessages(userConversations);
  });

  return unsubscribe;
}

export default fetchUserChats;


// async function fetchUserChats() {
//   // const userId = auth.currentUser?.uid;
//   const userId = "123"

//   if (!userId) {
//     console.error("No user is authenticated.");
//     return [];
//   }

//   const conversationsRef = collection(db, "conversations");
//   const q = query(
//     conversationsRef,
//     where("participants", "array-contains", userId)
//   );

//   const querySnapshot = await getDocs(q);

//   const userConversations = querySnapshot.docs.map(doc => ({
//     ...doc.data(),
//     id: doc.id,
//   }));

//   // console.log("userID:", userId);
//   // console.log("All fetched documents:", querySnapshot.docs);

//   return userConversations;
// }

// export default fetchUserChats;