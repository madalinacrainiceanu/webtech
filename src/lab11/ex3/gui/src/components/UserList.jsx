import { useEffect, useState } from 'react'
import Student from './Student'
import Professor from './Professor'
import './UserList.css'

const SERVER = 'http://localhost:8080'

function UserList() {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const response = await fetch(`${SERVER}/users`)
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <h2>Lista Studenti</h2>
      <div className='user-list'>
        {users
          .filter(user => user.type === 'student')
          .map(e => <Student key={e.id} item={e} />)
        }
      </div>

      <h2>Lista Profesori</h2>
      <div className='user-list'>
        {users
          .filter(user => user.type === 'professor')
          .map(e => <Professor key={e.id} item={e} />)
        }
      </div>
    </div>
  )
}

export default UserList