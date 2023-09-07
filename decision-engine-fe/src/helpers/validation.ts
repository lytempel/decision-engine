import { MIN_SUM, MAX_SUM, MIN_PERIOD, MAX_PERIOD } from '@/helpers/constants'

export const validatePersonalCode = (personalCode: string) => {
  let error = ''
  let isValid = true

  if (!personalCode) {
    error = 'Insert a personal code'
    isValid = false
  }
  return { error, isValid }
}

export const validateLoanAmount = (loanAmount: number) => {
  let error = ''
  let isValid = true

  if (!loanAmount) {
    error = 'Insert a loan amount'
    isValid = false
  } else if (loanAmount < MIN_SUM || loanAmount > MAX_SUM) {
    error = `Requested loan amount has to be between ${MIN_SUM} € and ${MAX_SUM} €`
    isValid = false
  }
  return { error, isValid }
}

export const validateLoanPeriod = (loanPeriod: number) => {
  let error = ''
  let isValid = true

  if (!loanPeriod) {
    error = 'Insert a loan period in months'
    isValid = false
  } else if (loanPeriod < MIN_PERIOD || loanPeriod > MAX_PERIOD) {
    error = `Requested loan period has to be between ${MIN_PERIOD} and ${MAX_PERIOD} months`
    isValid = false
  }
  return { error, isValid }
}
