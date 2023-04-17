// components/SearchBar.js
import React, { useState } from 'react';
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../../../backend/firebase/firebase';
import ConversationItem from './ConversationItem';
import magnifyglass from '../../assets/magnifyglass'

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
    <div className="search-bar bg-white py-2">
      <div className="flex items-center justify-between search-form rounded-xl border-solid border-2 border-gray-400 mx-4 py-1 px-4 text-lg font-semibold">
        <input
          className='w-full'
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKey}
        />
        <button onClick={handleSearch}>{magnifyglass}</button>
      </div>
      {user && <div className="userChat">
        <div className="userChatInfo bg-white">
          <ConversationItem conversation={user} ></ConversationItem>
        </div>
      </div>}
    </div >
  );
};

export default SearchBar;
