import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { addNote, deleteNote } from '../actions/actions'

const noteListSelector = state => state.list.notes

const NoteList = () => {
  const notes = useSelector(noteListSelector, shallowEqual)
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <h3>list of notes</h3>
        {
          notes.map((note, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span>{note}</span>
              <button onClick={() => dispatch(deleteNote(index))}>Delete</button>
            </div>
          ))
        }
      </div>
      <div>
        <h3>add a note</h3>
        <input 
            type='text' 
            placeholder='note content' 
            onChange={(evt) => setContent(evt.target.value)} 
            value={content}
        />
        <button onClick={() => {
            dispatch(addNote(content))
            setContent('') 
        }}>
            Add
        </button>
      </div>
    </div>
  )
}

export default NoteList