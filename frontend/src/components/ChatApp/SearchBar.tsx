// components/SearchBar.js
import React, { useState } from 'react';
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../../../backend/firebase/firebase';
import ConversationItem from './ConversationItem';


const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<(DocumentData)>();
  const [err, setErr] = useState(false);


  const handleSearch = async () => {
    const q = query(collection(db, "ChatUserPsychiatrists"), where("name", "==", searchTerm))
    const querySnapshot = await getDocs(q);

    try {
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        // console.log(user);
      });
    } catch (err) {
      setErr(true);
    }

  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // onSearch(event.target.value);
  };

  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  }

  return (
    <div className="search-bar">
      <div className="search-form">
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKey}
        />
      </div>
      {user && <div className="userChat">
        <div className="userChatInfo">
          <span>Search is working</span>
          <ConversationItem conversation={user} ></ConversationItem>
        </div>
      </div>}
    </div >
  );
};

export default SearchBar;
