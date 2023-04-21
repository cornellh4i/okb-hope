import React from 'react'
import Navbar from '../components/Navbar'
import Pro_Profile from '../components/Pro_Profile'
import { useFirestoreDocData } from 'reactfire';
import { db } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection, doc, addDoc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import 'firebase/firestore';

// const description = collection(db, 'Psychiatrists/`Psychiatrist 1`/description')
// const name = collection(db, 'Psychiatrists/Psychiatrist 1/name')
// const title = collection(db, 'Psychiatrists/Psychiatrist 1/title')
const psychiatrists = collection(db, 'Psychiatrists')

export default function PsychiatristProfile() {
  return (
    <div>
      {/* <Navbar /> */}
      <Pro_Profile name = "Helen Spore" description = "Intro Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." title = "Dr. " gender = "Female" languages = {["English", "Twi"]} photo_id = "null"></Pro_Profile>
    
      {/* <Pro_Profile name = {psychiatrists[id].name} description = {psychiatrists[id].description} title = {psychiatrists[id].title} gender = {psychiatrists[id].flags.gender} languages = {psychiatrists[id].flags.languages} photo_id = {psychiatrists[id].photo_id}></Pro_Profile> */}
    </div>
  )
}
