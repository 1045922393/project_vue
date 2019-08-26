import axios from 'axios'
export const getRolesList = () => {
  return axios({
    url: 'roles'
  })
}
export const delRightById = (id, rid) => {
  return axios({
    url: `roles/${id}/rights/${rid}`,
    method: 'delete'
  })
}
