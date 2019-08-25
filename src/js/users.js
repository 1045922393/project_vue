import axios from 'axios'
// export default {
//   addUser (data) {
//     // 直接return axios
//     return axios({
//       url: '/users',
//       method: 'post',
//       data
//     })
//   }
// }
export const addUser = data => {
  return axios({
    url: '/users',
    method: 'post',
    data
  })
}
