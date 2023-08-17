export default class APIService {

  static InsertReservation(body) {
      return fetch('http://127.0.0.1:8000/reservations/', {
          'method': 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
      }).then(resp => resp.json())
          .catch(error => console.log(error))
  }

  static async DeleteReservation(reservations_id) {
      try {
          const response = await fetch(`http://127.0.0.1:8000/reservations/${reservations_id}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          // 성공적인 응답 처리
          return response
      } catch (error) {
          console.error('Error:', error);
      }
  }

  // static GetReservation(body) {
  //   return fetch('http://127.0.0.1:8000/reservations/', {
  //     'method' : 'GET',
  //     headers : {
  //       'Content-Type' : 'application/json',
  //     },
  //     body:JSON.stringify(body)
  //   }).then(resp => resp.json())
  //   .catch(error => console.log(error))

  // }
}
