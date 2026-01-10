import React from 'react'

function UserDetails(props) {
  const { user } = props

  
  if (!user) {
    return (
      <div className='details-pane'>
        <h3>Detalii</h3>
        <p>Selecteaza un utilizator din lista.</p>
      </div>
    )
  }

  
  return (
    <div className='details-pane'>
      <h3>Detalii: {user.username}</h3>
      <p><b>Nume:</b> {user.fullName}</p>
      <p><b>Job:</b> {user.job}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Despre:</b> {user.bio}</p>
    </div>
  )
}

export default UserDetails