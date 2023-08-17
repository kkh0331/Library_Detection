// import React, {useEffect, useState} from "react";
// import APIService from "../APIService";

// function DummyShow(props) {

//     const [data, setData] = useState([]);
//     const {reservations} = props
//     const [stuNum, setStuNum] = useState(''); //학번
//     const [seatNum, setSeatNum] = useState(''); //좌석번호
//     // const [seatStatus, setSeatStatus] = useState('USE');
//     // const [count, setCount] = useState(0);

//     useEffect(() => {
//         setStuNum(props.reservations.stuNum)
//         setSeatNum(props.reservations.seatNum)
//         // setSeatStatus(props.reservations.seatStatus)
//         // setCount(props.reservations.count)
//         // getStreamingData();

//         // const interval = setInterval(() => {
//         //     getStreamingData();
//         //     console.log(data);
//         // }, 1000);

//         // return () => {
//         //     clearInterval(interval);
//         // };
//     }, [props.reservations]);

//     // const getStreamingData = async () => {
//     //     fetch('http://localhost:8000/reservations/', {
//     //         'method': 'GET',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //         }
//     //     })
//     //         .then(resp => resp.json())
//     //         .then(resp => setData(resp))
//     //         .catch(error => console.log(error))
//     // }

//     useEffect(() => {
//         const emptySeats = props.reservations.filter((item) => item.seatStatus === 'EMPTY' && item.count >= 3);
//         const privateSeats = props.reservations.filter((item) => item.seatStatus === 'PRIVATE' && item.count >= 6);
    
//         emptySeats.forEach((emptySeat) => {
//           const matchingReservations = reservations.filter((reservation) => {
//             return reservation.seatNum === emptySeat.seatNum;
//           });
    
//           matchingReservations.forEach((reservation) => {
//             APIService.DeleteReservation(reservation.id)
//               .then(resp => {
//                 console.log(resp);
//               });
//           });
//         });
    
//         privateSeats.forEach((privateSeat) => {
//           const matchingReservations = reservations.filter((reservation) => {
//             return reservation.seatNum === privateSeat.seatNum;
//           });
    
//           matchingReservations.forEach((reservation) => {
//             APIService.DeleteReservation(reservation.id)
//               .then(resp => {
//                 console.log(resp);
//               });
//           });
//         });
//       }, [data, reservations]);
//     // useEffect(() => {
//     //     if (data.find((item) => item.seatStatus === 'EMPTY' && item.count >= 3)) {
//     //         const matchingReservations = props.reservations.filter((reservation) => {
//     //         return reservation.seatNum === data.find((item) => item.seatStatus === 'EMPTY' && item.count >= 3).seatNum;
//     //         });
      
//     //         matchingReservations.forEach((reservation) => {
//     //             APIService.DeleteReservation(reservation.id)
//     //             .then(resp => {
//     //               console.log(resp);
//     //             });
//     //         });
//     //     }

//     //     if (data.find((item) => item.seatStatus === 'PRIVATE' && item.count >= 6)) {
//     //         const matchingReservations = props.reservations.filter((reservation) => {
//     //         return reservation.seatNum === data.find((item) => item.seatStatus === 'PRIVATE' && item.count >= 6).seatNum;
//     //         });

//     //         matchingReservations.forEach((reservation) => {
//     //             APIService.DeleteReservation(reservation.id)
//     //             .then(resp => {
//     //                 console.log(resp);
//     //             });
//     //         });
//     //     }
            
//     // }, [data, props.reservations])
    
//     return (
//         <div>

//             {/* 퇴실했는데 반납하지 않은 경우 : 15초 */}
            
//             {/* {data.find((item) => item.seatStatus === 'EMPTY' && item.count >= 3) && (
//                 // console.log("Seat count is 15 or more")
//                 // console.log(props.reservations)
//                 props.reservations.filter((reservation) => {
//                     if (reservation.seatNum === data.seatNum) {
//                         APIService.DeleteReservation(reservation.id)
//                         .then(resp => {
//                             console.log(resp);
//                         })
//                     }
//                 })
//             )} */}

//             {/* 사석화의 경우 : 30초 */}
//             {/* {data.find((item) => item.seatStatus === 'PRIVATE' && item.count >= 6) && (
//                 // console.log("Seat count is 15 or more")
//                 // console.log(props.reservations)
//                 props.reservations.filter((reservation) => {
//                     if (reservation.seatNum === item.seatNum) {
//                         APIService.DeleteReservation(reservation.id)
//                         .then(resp => {
//                             console.log(resp);
//                         })
//                     }
//                 })
//             )} */}

//         </div>
//     )

// }

// export default DummyShow;