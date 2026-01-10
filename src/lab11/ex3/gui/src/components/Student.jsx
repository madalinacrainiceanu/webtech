import React from 'react'
import '../User.css'

function Student(props) {
  const { item } = props
  return (
    <div className='user student-style'>
      <div className='username'>
        Student: {item.username}
      </div>
      <div className='fullName'>
        {item.fullName}
      </div>
    </div>
  )
}

export default Student