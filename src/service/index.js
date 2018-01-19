import axios from 'axios';
const host = 'http://192.168.1.111:3000/mock/30';

// 验证手机号邀请码是否有效
export async function testEffective (params) {
  return await axios.post(`${host}/v1/register`,params);
}
//注册校验
export async function testRegister (params) {
  return await axios.post(`${host}/v1/register_validate`,params);
}
//设置密码
export async function setPassword (params) {
  return await axios.post(`${host}/v1/init_password`,params);
}
