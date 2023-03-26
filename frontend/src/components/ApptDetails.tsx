import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import axios from 'axios';
import { useParams } from "react-router-dom";


const ApptDetails = () => {
  const { id } = useParams();
};
// class Heroes extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       heroes: [],
//       loading: true,
//       error: false,
//     };
//   }
//   componentDidMount() {
//     axios.get('http://localhost:5555/heroes')
//       .then(res => {
//         const heroes = res.data;
//         this.setState({ heroes, loading: false });
//       })
//       .catch(err => { // log request error and prevent access to undefined state
//         this.setState({ loading: false, error: true });
//         console.error(err);
//       })
//   }
//   render() {
//     if (this.state.loading) {
//       return (
//         <div>
//           <p> Loading... </p>
//         </div>
//       )
//     }
//     if (this.state.error || !this.state.heroes) {
//       return (
//         <div>
//           <p> An error occured </p>
//         </div>
//       )
//     }
//     return (
//       <div>
//         <BrowserRouter>
//           //what should be here?
//         </BrowserRouter>
//       </div>
//     );
//   }
// }

export default ApptDetails;