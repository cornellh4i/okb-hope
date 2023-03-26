import App from 'next/app';
import React from 'react';
import AppointmentCard from './AppointmentCard';

const style = require("@/styles/Home.module.css");
const names = ["Erica Smithson", "Ronald River", "Hermes Heroic", "Pomelo Pigskin"]
const starts = ['2023-04-10 13:30', '2023-05-10 12:30', '2023-06-15 14:15', '2023-06-20 14:15']
const ends = ['2023-04-10 14:30', '2023-05-10 13:30', '2023-06-15 15:15', '2023-06-20 15:15']

const Dashboard=() =>{
  return <div className="grid grid-cols-4 gap-4 items-center pb-1/12 shrink">
    <AppointmentCard p_name = {names[0]} start = {new Date(starts[0])} end = {new Date(ends[0])}>
    </AppointmentCard>
    <AppointmentCard p_name = {names[1]} start = {new Date(starts[1])} end = {new Date(ends[1])}>
    </AppointmentCard>
    <AppointmentCard p_name = {names[2]} start = {new Date(starts[2])} end = {new Date(ends[2])}>
    </AppointmentCard>
    <AppointmentCard p_name = {names[3]} start = {new Date(starts[3])} end = {new Date(ends[3])}>
    </AppointmentCard>
  </div>
  // return <div> 
  //    <AppointmentCard p_name = 'Erica Smith' start = {new Date('2016-01-04 13:30')} end = {new Date('2016-01-04 14:30')}>
  //    </AppointmentCard>
  // </div>;
}

export default Dashboard;