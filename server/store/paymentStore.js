import { getStoreState, saveStoreState } from './storageEngine.js'

const DEFAULT_PAYMENT_SETTINGS = {
  bankName: 'Meezan Bank Limited',
  accountTitle: 'Amanat Electronics',
  accountNumber: '02010108923456',
  iban: 'PK76MEZN0002010108923456',
  branch: 'Main Market Branch, Faisalabad',
  raastId: '03007654321',
  whatsappNumber: '+923007654321',
  formattedWhatsapp: '+92 300 7654321',
  instructions:
    'The customer receives the official Amanat Electronics bank account / Raast ID details along with their order summary. The customer transfers the exact order total from their bank app / EasyPaisa / JazzCash using the Order Number as the payment reference.',
  isCodEnabled: true,
  isBankTransferEnabled: true,
  updatedAt: new Date().toISOString(),
}

export const getPaymentSettings = () => {
  const state = getStoreState()
  if (!state.paymentSettings) {
    state.paymentSettings = { ...DEFAULT_PAYMENT_SETTINGS }
    saveStoreState(state)
  }
  return state.paymentSettings
}

export const updatePaymentSettings = (updatedData = {}) => {
  const state = getStoreState()
  const current = getPaymentSettings()

  state.paymentSettings = {
    ...current,
    ...updatedData,
    updatedAt: new Date().toISOString(),
  }

  saveStoreState(state)
  return state.paymentSettings
}
