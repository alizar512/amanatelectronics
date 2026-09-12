import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../store/teamStore.js'

export const getAdminTeamMembers = (request, response) => {
  const members = getAllTeamMembers()
  response.json({
    items: members,
    total: members.length,
  })
}

export const getAdminTeamMember = (request, response) => {
  const member = getTeamMemberById(request.params.id)
  if (!member) {
    response.status(404).json({ message: 'Team member not found' })
    return
  }
  response.json({ item: member, member })
}

export const createAdminTeamMember = (request, response) => {
  const { name, role, about } = request.body || {}
  if (!name || !name.trim()) {
    response.status(400).json({ message: 'Name is required' })
    return
  }

  const member = createTeamMember(request.body)
  response.status(201).json({
    message: 'Team member added successfully',
    item: member,
    member,
  })
}

export const updateAdminTeamMember = (request, response) => {
  const member = updateTeamMember(request.params.id, request.body)
  if (!member) {
    response.status(404).json({ message: 'Team member not found' })
    return
  }

  response.json({
    message: 'Team member updated successfully',
    item: member,
    member,
  })
}

export const deleteAdminTeamMember = (request, response) => {
  const member = deleteTeamMember(request.params.id)
  if (!member) {
    response.status(404).json({ message: 'Team member not found' })
    return
  }

  response.json({
    message: 'Team member deleted successfully',
    item: member,
  })
}
