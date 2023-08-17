// import React, { useEffect } from 'react'
// import APIService from "../APIService";

// function ReservationList(props) {
//   useEffect(() => {
//     props.reservations.forEach((reservation) => {
//       if (reservation.seatStatus === "EMPTY" && reservation.count >= 3) {
//         APIService.DeleteReservation(reservation.id)
//         .then((resp) => {
//           console.log(resp);
//           props.onReservationDeleted(reservation.id);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//       } else if (reservation.seatStatus === 'PRIVATE' && reservation.count >= 5) {
//         APIService.DeleteReservation(reservation.id)
//           .then((resp) => {
//             console.log(resp);
//             props.onReservationDeleted(reservation.id);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }    
//     });
//   },[props.reservations])
//   return (
//     <div>

//     </div>
//   )
// }

// export default ReservationList

// import React, { useEffect } from 'react'
// import APIService from "../APIService";

// function ReservationList(props) {
//   const handleReservationDeleted = (deletedId) => {
//     props.onReservationDeleted(deletedId);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       props.reservations.forEach((reservation) => {
//         if (reservation.seatStatus === "EMPTY" && reservation.count >= 3) {
//           APIService.DeleteReservation(reservation.id)
//             .then((resp) => {
//               console.log(resp);
//               handleReservationDeleted(reservation.id);
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         } else if (reservation.seatStatus === 'PRIVATE' && reservation.count >= 5) {
//           APIService.DeleteReservation(reservation.id)
//             .then((resp) => {
//               console.log(resp);
//               handleReservationDeleted(reservation.id);
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         }
//       });
//     }, 1000); // 5초마다 갱신하도록 설정 (원하는 간격으로 수정 가능)

//     return () => {
//       clearInterval(interval); // 컴포넌트가 언마운트되면 인터벌을 클리어하여 멈춤
//     };
//   }, [props.reservations]);

//   return (
//     <div></div>
//   );
// }

// export default ReservationList;
