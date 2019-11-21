import db from '../models/db'
import instance from '../api'
import { Notyf } from 'notyf'

class PasswordService {
  async checkPassword(password) {
    if (!password) {
      return false
    }
    let doc = null
    try {
      doc = await db.get('password')
      doc.password = password
      await db.put(doc)
    } catch (error) {
      await db.post({
        _id: 'password',
        password
      })
    }
    try {
      await instance.get(`/checkpassword`)
      return true
    } catch (error) {
      new Notyf().error({ error })
      await this.reset()
      return false
    }
  }
  async getPassword() {
    try {
      const doc = await db.get('password')
      if (doc) {
        return doc.password
      }
      return ''
    } catch (error) {
      return ''
    }
  }
  async reset() {
    try {
      const doc = await db.get('password')
      await db.remove(doc)
      return true
    } catch (error) {
      return false
    }
  }
}

export default new PasswordService()
