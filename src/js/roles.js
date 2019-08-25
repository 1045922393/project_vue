import axios from 'axios'
export const getRolesList = () => {
  return axios({
    url: 'roles'
  })
}
