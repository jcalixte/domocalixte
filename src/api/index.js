import axios from 'axios'
import db from '../models/db'

const instance = axios.create({
  baseURL: 'https://juliencalixte.ddns.net/domo/'
})

instance.interceptors.request.use(async (request) => {
  try {
    const doc = await db.get('password')
    if (doc) {
      request.headers['X-General-Password'] = doc.password
    }
  } catch (error) {
    return request
  }
  return request
})

export default instance
