import './App.css';
import MainPage from './components/MainPage';
import Header from './components/header';
import React from 'react';
import { useState, useEffect } from 'react';
// import ReservationList from './components/ReservationList';
// import APIService from './APIService';

function App() {

  const [reservations, setReservations] = useState([]);

  // GET 예시 (ReservationList.js 참고)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/reservations/', {
      'method' : 'GET',
      headers : {
        'Content-Type' : 'application/json',
      }
    })  
    .then(resp => resp.json())
    .then(resp => setReservations(resp))
    .catch(error => console.log(error))
    // console.log("Reservation seatnum : ", reservations[1]);
  }, [])

  // const handleReservationDeleted = (deletedId) => {
  //   setReservations((prevReservations) =>
  //     prevReservations.filter((reservation) => reservation.id !== deletedId)
  //   );
  // };


  return (
    <div className="App">
      {/* <ReservationList reservations={reservations}></ReservationList> */}
      <Header />
      <MainPage reservations={reservations}></MainPage>
    </div>
  ); 
}


export default App;
