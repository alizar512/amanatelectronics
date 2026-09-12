import { saveContactMessage, subscribeNewsletter } from '../store/inquiryStore.js'

export const submitContactMessage = (request, response) => {
  const { name, email, phone, subject, message } = request.body || {}

  if (!name || !email || !message) {
    response.status(400).json({ message: 'Name, email, and message are required' })
    return
  }

  const saved = saveContactMessage({ name, email, phone, subject, message })

  response.status(201).json({
    message: 'Thank you for reaching out! Our support team will get back to you shortly.',
    inquiry: saved,
  })
}

export const subscribeNewsletterEndpoint = (request, response) => {
  const { email } = request.body || {}

  if (!email || !email.includes('@')) {
    response.status(400).json({ message: 'A valid email address is required' })
    return
  }

  const result = subscribeNewsletter(email)
  response.json(result)
}
