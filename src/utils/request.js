/**
 * 封装 axios 请求模块
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8888' // 基础路径
  // baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

export default request
