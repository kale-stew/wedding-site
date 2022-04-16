import { useState } from 'react'
import { CONTACT_ENDPOINT } from '../utils/constants'

const ContactForm = () => {
  const [status, setStatus] = useState()
  const handleSubmit = (e) => {
    e.preventDefault()
    const inputs = e.target.elements
    const injectedData = {}
    const data = {}
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value
      }
    }
    Object.assign(data, injectedData)

    if (data.name?.includes('http') || data.email?.includes('http') || data.address?.includes('http') || data.message?.includes('http')) {
      setStatus('We appreciate your message!')
      return
    }
    
    fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Check for likely spam/bot request, validate via captcha
        if (response.status === 422) {
          Object.keys(injectedData).forEach((key) => {
            const el = document.createElement('input')
            el.type = 'hidden'
            el.name = key
            el.value = injectedData[key]
            e.target.appendChild(el)
          })

          e.target.submit()
          throw new Error('Please finish the captcha challenge')
        }

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(() => setStatus('We appreciate your message!'))
      .catch((err) => setStatus(err.toString()))
  }

  if (status) {
    return (
      <div>
        <h1>
          <i>Thank you!</i>
          <div>❤️</div>
        </h1>
        <div>{status}</div>
      </div>
    )
  }

  return (
    <form
      action={CONTACT_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      target="_blank"
      className="contact-form"
    >
      <input type="text" placeholder="Your Name" name="name" required />
      <input type="email" placeholder="your@email.com" name="email" required />
      <input
        type="text"
        placeholder="Your Mailing Address, City, State, Zip Code"
        name="address"
      />
      <textarea placeholder="Your message" name="message" required />
      <button type="submit"> Send your message </button>
    </form>
  )
}

export default ContactForm
