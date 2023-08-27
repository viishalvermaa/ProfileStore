import { useContactsContext } from '../hooks/useContactsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ContactDetails = ({ contact }) => {
  const { dispatch } = useContactsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('http://localhost:4000/api/contacts/' + contact._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="contact-details">
      <h4>{contact.title}</h4>
      <p><strong>Link1: </strong>{contact.link1}</p>
      <p><strong>Link2: </strong>{contact.link2}</p>
      <p>{formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default ContactDetails