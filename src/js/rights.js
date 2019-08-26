import axios from 'axios'
export const getAllrights = (type) => {
  return axios({
    url: `rights/${type}`,
    method: 'get'
  })
}
