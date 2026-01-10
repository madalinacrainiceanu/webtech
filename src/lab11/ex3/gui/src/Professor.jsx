import React from 'react'
import '../User.css'

function Professor(props) {
  const { item } = props
  return (
    <div className='user professor-style'>
      <div className='username'>
        Prof: {item.username}
      </div>
      <div className='fullName'>
        {item.fullName}
      </div>
    </div>
  )
}

export default Professor