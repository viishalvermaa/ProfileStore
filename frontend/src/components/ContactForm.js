import { useState } from "react"
import { useContactsContext } from "../hooks/useContactsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const ContactForm = () => {
  const { dispatch } = useContactsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [link1, setLink1] = useState('')
  const [link2, setLink2] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const contact = {title, link1, link2}

    const response = await fetch('http://localhost:4000/api/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setLink1('')
      setLink2('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_CONTACT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Contact</h3>

      <label>Contact Name:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Link1:</label>
      <input 
        type="text"
        onChange={(e) => setLink1(e.target.value)}
        value={link1}
        className={emptyFields.includes('link1') ? 'error' : ''}
      />

      <label>Link2:</label>
      <input 
        type="text"
        onChange={(e) => setLink2(e.target.value)}
        value={link2}
        className={emptyFields.includes('link2') ? 'error' : ''}
      />

      <button>Add Contact</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ContactForm