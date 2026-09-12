import bcrypt from 'bcryptjs'
import { env } from '../config/env.js'
import { ROLES } from '../constants/roles.js'

export const adminUsers = [
  {
    id: 1,
    name: env.seedUsers.admin.name,
    email: env.seedUsers.admin.email,
    role: ROLES.ADMIN,
    passwordHash: bcrypt.hashSync(env.seedUsers.admin.password, 10),
  },
  {
    id: 2,
    name: env.seedUsers.manager.name,
    email: env.seedUsers.manager.email,
    role: ROLES.MANAGER,
    passwordHash: bcrypt.hashSync(env.seedUsers.manager.password, 10),
  },
]
