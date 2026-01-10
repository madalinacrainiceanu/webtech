import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getNotes, deleteNote } from '../actions/actions'

const noteListSelector = state => state.list.notes

const NoteList = () => {
  const notes = useSelector(noteListSelector, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])

  return (
    <div>
      <h3>List of notes (from Server)</h3>
      {
        notes.map(note => (
          <div key={note.id} style={{ borderBottom: '1px solid #ccc', padding: '5px', display:'flex', justifyContent:'space-between', width: '200px' }}>
            <span>{note.content}</span>
            <button onClick={() => dispatch(deleteNote(note.id))}>Delete</button>
          </div>
        ))
      }
    </div>
  )
}

export default NoteList