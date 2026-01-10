import { useState } from 'react'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import './App.css'

function App() {
  
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div className='app-container'>
      <h1>Exercitiu 4 - Detalii Utilizator</h1>
      
      <div className='content-wrapper'>
        <div className='left-column'>
          {/* Trimitem functia de modificare a starii in jos */}
          <UserList onSelect={(user) => setSelectedUser(user)} />
        </div>
        
        <div className='right-column'>
          {/* Trimitem starea curenta in jos */}
          <UserDetails user={selectedUser} />
        </div>
      </div>
    </div>
  )
}

export default App