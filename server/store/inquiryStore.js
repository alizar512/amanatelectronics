import { getStoreState, saveStoreState } from './storageEngine.js'

export const saveContactMessage = ({ name, email, phone = '', subject = '', message }) => {
  const state = getStoreState()
  const nextId = Math.max(...state.contactMessages.map((m) => Number(m.id) || 0), 0) + 1

  const newMessage = {
    id: nextId,
    name: String(name || '').trim(),
    email: String(email || '').trim().toLowerCase(),
    phone: String(phone || '').trim(),
    subject: String(subject || 'General Inquiry').trim(),
    message: String(message || '').trim(),
    isRead: false,
    createdAt: new Date().toISOString(),
  }

  state.contactMessages.unshift(newMessage)
  saveStoreState(state)
  return newMessage
}

export const getAllContactMessages = () => {
  const state = getStoreState()
  return state.contactMessages
}

export const markMessageAsRead = (id) => {
  const state = getStoreState()
  const msg = state.contactMessages.find((m) => String(m.id) === String(id))
  if (msg) {
    msg.isRead = true
    saveStoreState(state)
  }
  return msg
}

export const subscribeNewsletter = (email) => {
  const state = getStoreState()
  const normalized = String(email || '').trim().toLowerCase()

  const existing = state.newsletterSubscribers.find((s) => s.email.toLowerCase() === normalized)
  if (existing) {
    return { alreadySubscribed: true, message: 'You are already subscribed to our newsletter.' }
  }

  const nextId = Math.max(...state.newsletterSubscribers.map((s) => Number(s.id) || 0), 0) + 1
  const newSub = {
    id: nextId,
    email: normalized,
    createdAt: new Date().toISOString(),
  }

  state.newsletterSubscribers.push(newSub)
  saveStoreState(state)
  return { alreadySubscribed: false, message: 'Thank you for subscribing to Amanat Electronics!' }
}
