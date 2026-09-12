import { getStoreState, saveStoreState } from './storageEngine.js'

const defaultTeamMembers = [
  {
    id: 1,
    name: 'Mian Amanat Ali',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&h=256&q=80',
    about: 'Our foundational philosophy has remained unchanged for over 15 years: transparency, genuine products, and uncompromising customer care. We ensure every Pakistani home receives 100% verified original PEL electronics backed by direct manufacturer warranty and honest pricing.',
    isExecutive: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Usman Amanat',
    role: 'Managing Director',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80',
    about: 'Overseeing nationwide logistics, showroom customer experience, and certified technician installation networks across Pakistan.',
    isExecutive: false,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const getAllTeamMembers = () => {
  const state = getStoreState()
  if (!Array.isArray(state.teamMembers)) {
    state.teamMembers = [...defaultTeamMembers]
    saveStoreState(state)
  }
  return [...state.teamMembers].sort((a, b) => (a.order || 99) - (b.order || 99))
}

export const getTeamMemberById = (id) => {
  const members = getAllTeamMembers()
  return members.find((m) => String(m.id) === String(id)) || null
}

export const createTeamMember = (payload) => {
  const state = getStoreState()
  if (!Array.isArray(state.teamMembers)) {
    state.teamMembers = [...defaultTeamMembers]
  }

  const nextId = Math.max(...state.teamMembers.map((m) => Number(m.id) || 0), 0) + 1
  const newMember = {
    id: nextId,
    name: payload.name || '',
    role: payload.role || 'Team Member',
    image: payload.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    about: payload.about || '',
    isExecutive: Boolean(payload.isExecutive || payload.role?.toLowerCase().includes('ceo')),
    order: payload.order !== undefined ? Number(payload.order) : nextId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  state.teamMembers = [...state.teamMembers, newMember]
  saveStoreState(state)
  return newMember
}

export const updateTeamMember = (id, payload) => {
  const state = getStoreState()
  if (!Array.isArray(state.teamMembers)) {
    state.teamMembers = [...defaultTeamMembers]
  }

  const index = state.teamMembers.findIndex((m) => String(m.id) === String(id))
  if (index === -1) return null

  const existing = state.teamMembers[index]
  const updated = {
    ...existing,
    ...payload,
    isExecutive: payload.isExecutive !== undefined 
      ? Boolean(payload.isExecutive) 
      : Boolean(payload.role?.toLowerCase().includes('ceo') || existing.isExecutive),
    updatedAt: new Date().toISOString(),
  }

  state.teamMembers[index] = updated
  saveStoreState(state)
  return updated
}

export const deleteTeamMember = (id) => {
  const state = getStoreState()
  if (!Array.isArray(state.teamMembers)) {
    state.teamMembers = [...defaultTeamMembers]
  }

  const existing = state.teamMembers.find((m) => String(m.id) === String(id))
  if (!existing) return null

  state.teamMembers = state.teamMembers.filter((m) => String(m.id) !== String(id))
  saveStoreState(state)
  return existing
}
