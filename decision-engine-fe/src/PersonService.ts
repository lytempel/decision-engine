import type { Person } from './helpers/models'

export default class PersonService {
  static getPerson = async (personalCode: string): Promise<Person | null> => {
    try {
      const res = await fetch(`http://localhost:5001/api/persons/${personalCode}`)

      if (res.status === 400) {
        throw 'Inserted personal code is unknown'
      }

      const data = await res.json()
      return data[0]
    } catch (err) {
      return null
    }
  }
}
