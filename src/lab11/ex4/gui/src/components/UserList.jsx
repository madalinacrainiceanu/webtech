import { useEffect, useState } from 'react'
import './UserList.css'

const SERVER = ''

function UserList(props) {
  const { onSelect } = props
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
    <div className='list-pane'>
      <h3>Lista Utilizatori</h3>
      {users.map(user => (
        <div key={user.id} className='user-item'>
          <span>{user.username}</span>
          <button onClick={() => onSelect(user)}>Vezi Detalii</button>
        </div>
      ))}
    </div>
  )
}

export default UserList