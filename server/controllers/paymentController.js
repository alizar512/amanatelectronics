import { getPaymentSettings, updatePaymentSettings } from '../store/paymentStore.js'

export const getPublicPaymentSettings = (_request, response) => {
  try {
    const settings = getPaymentSettings()
    response.json({ settings })
  } catch (error) {
    response.status(500).json({ message: 'Failed to retrieve payment settings', error: error.message })
  }
}

export const getAdminPaymentSettings = (_request, response) => {
  try {
    const settings = getPaymentSettings()
    response.json({ settings })
  } catch (error) {
    response.status(500).json({ message: 'Failed to retrieve payment settings', error: error.message })
  }
}

export const updateAdminPaymentSettings = (request, response) => {
  try {
    const {
      bankName,
      accountTitle,
      accountNumber,
      iban,
      branch,
      raastId,
      whatsappNumber,
      formattedWhatsapp,
      instructions,
      isCodEnabled,
      isBankTransferEnabled,
    } = request.body || {}

    if (!bankName || !accountTitle || !accountNumber || !iban || !raastId) {
      response.status(400).json({
        message: 'Bank Name, Account Title, Account Number, IBAN, and Raast ID are required',
      })
      return
    }

    const updated = updatePaymentSettings({
      bankName: String(bankName).trim(),
      accountTitle: String(accountTitle).trim(),
      accountNumber: String(accountNumber).trim(),
      iban: String(iban).trim(),
      branch: String(branch || '').trim(),
      raastId: String(raastId).trim(),
      whatsappNumber: String(whatsappNumber || '').trim(),
      formattedWhatsapp: String(formattedWhatsapp || whatsappNumber || '').trim(),
      instructions: String(instructions || '').trim(),
      isCodEnabled: isCodEnabled !== undefined ? Boolean(isCodEnabled) : true,
      isBankTransferEnabled: isBankTransferEnabled !== undefined ? Boolean(isBankTransferEnabled) : true,
    })

    response.json({
      message: 'Payment and account details updated successfully',
      settings: updated,
    })
  } catch (error) {
    response.status(500).json({ message: 'Failed to update payment settings', error: error.message })
  }
}
