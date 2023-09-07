import { describe, expect, test } from 'vitest'
import { validatePersonalCode, validateLoanAmount, validateLoanPeriod } from '../helpers/validation'
import { MIN_SUM, MAX_SUM, MIN_PERIOD, MAX_PERIOD } from '../helpers/constants'

describe('validatePersonalCode', () => {
  test("should return 'Insert a personal code' when input is empty", () => {
    const personalCodeValidation = validatePersonalCode(undefined)

    expect(personalCodeValidation.error).toBe('Insert a personal code')
  })
})

describe('validateLoanAmount', () => {
  test("should return 'Insert a loan amount' when input is empty", () => {
    const loanAmountValidation = validateLoanAmount(undefined)

    expect(loanAmountValidation.error).toBe('Insert a loan amount')
  })

  test(`should return true when loan amount is at least ${MIN_SUM} € and maximum ${MAX_SUM} €`, () => {
    const loanAmountValidation = validateLoanAmount(MIN_SUM)

    expect(loanAmountValidation.isValid).toBe(true)
  })

  test(`should return true when loan amount is at least ${MIN_SUM} € and maximum ${MAX_SUM} €`, () => {
    const loanAmountValidation = validateLoanAmount(MAX_SUM)

    expect(loanAmountValidation.isValid).toBe(true)
  })

  test(`should return true when loan amount is at least ${MIN_SUM} € and maximum ${MAX_SUM} €`, () => {
    const loanAmountValidation = validateLoanAmount(4000)

    expect(loanAmountValidation.isValid).toBe(true)
  })

  test(`should return false when loan amount is less than ${MIN_SUM} € or more than ${MAX_SUM} €`, () => {
    const loanAmountValidation = validateLoanAmount(1200)

    expect(loanAmountValidation.isValid).toBe(false)
  })

  test(`should return false when loan amount is less than ${MIN_SUM} € or more than ${MAX_SUM} €`, () => {
    const loanAmountValidation = validateLoanAmount(10001)

    expect(loanAmountValidation.isValid).toBe(false)
  })
})

describe('validateLoanPeriod', () => {
  test("should return 'Insert a loan period in month' when input is empty", () => {
    const loanPeriodValidation = validateLoanPeriod(undefined)

    expect(loanPeriodValidation.error).toBe('Insert a loan period in months')
  })

  test(`should return true when loan period is at least ${MIN_PERIOD} and maximum ${MAX_PERIOD}`, () => {
    const loanPeriodValidation = validateLoanPeriod(MIN_PERIOD)

    expect(loanPeriodValidation.isValid).toBe(true)
  })

  test(`should return true when loan period is at least ${MIN_PERIOD} and maximum ${MAX_PERIOD}`, () => {
    const loanPeriodValidation = validateLoanPeriod(MAX_PERIOD)

    expect(loanPeriodValidation.isValid).toBe(true)
  })

  test(`should return true when loan period is at least ${MIN_PERIOD} and maximum ${MAX_PERIOD}`, () => {
    const loanPeriodValidation = validateLoanPeriod(30)

    expect(loanPeriodValidation.isValid).toBe(true)
  })

  test(`should return false when loan period is less than ${MIN_PERIOD} or more than ${MAX_PERIOD}`, () => {
    const loanPeriodValidation = validateLoanPeriod(11)

    expect(loanPeriodValidation.isValid).toBe(false)
  })

  test(`should return false when loan period is less than ${MIN_PERIOD} or more than ${MAX_PERIOD}`, () => {
    const loanPeriodValidation = validateLoanPeriod(61)

    expect(loanPeriodValidation.isValid).toBe(false)
  })
})
