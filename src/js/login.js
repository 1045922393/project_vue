import axios from './axios'
export const login = (data, success, fail, serverErr) => {
  axios({
    url: '/login',
    method: 'post',
    data: data
  }).then((res) => {
    if (res.data.meta.status === 200) {
      success(res)
    } else {
      fail(res)
    }
  }).catch((err) => { serverErr(err) })
}
