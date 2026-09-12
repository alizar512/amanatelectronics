import {
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
} from '../store/userStore.js'

export const getUserAddressesEndpoint = (request, response) => {
  const addresses = getUserAddresses(request.user.id)
  response.json({ addresses })
}

export const addUserAddressEndpoint = (request, response) => {
  const { title, fullName, phone, city, addressLine, isDefault } = request.body || {}

  if (!fullName || !phone || !city || !addressLine) {
    response.status(400).json({ message: 'Full name, phone, city, and address line are required' })
    return
  }

  const address = addUserAddress(request.user.id, {
    title,
    fullName,
    phone,
    city,
    addressLine,
    isDefault,
  })

  response.status(201).json({
    message: 'Address added successfully',
    address,
  })
}

export const updateUserAddressEndpoint = (request, response) => {
  const address = updateUserAddress(request.user.id, request.params.id, request.body)

  if (!address) {
    response.status(404).json({ message: 'Address not found' })
    return
  }

  response.json({
    message: 'Address updated successfully',
    address,
  })
}

export const deleteUserAddressEndpoint = (request, response) => {
  const deleted = deleteUserAddress(request.user.id, request.params.id)

  if (!deleted) {
    response.status(404).json({ message: 'Address not found' })
    return
  }

  response.json({ message: 'Address removed successfully' })
}
