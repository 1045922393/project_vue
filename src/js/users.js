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
// 根据id获取用户数据
export const getUser = data => {
  return axios({
    url: `users/${data}`
  })
}
// 提交编辑用户信息
export const submintEditUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}

// 删除用户
export const delUserById = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}

// 更改用户状态
export const changeStatus = (data) => {
  return axios({
    url: `users/${data.id}/state/${data.type}`,
    method: 'put'
  })
}

// 分配用户角色
export const roleChange = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data
  })
}
