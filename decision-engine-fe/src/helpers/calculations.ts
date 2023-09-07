import { Segmentation } from '@/helpers/models'

export const findCreditModifier = (segmentation: Segmentation): number => {
  switch (segmentation) {
    case Segmentation.segment_1:
      return 100
    case Segmentation.segment_2:
      return 300
    case Segmentation.segment_3:
      return 1000
    default:
      return 0
  }
}

export const calculateCreditScore = (
  creditModifier: number,
  loanAmount: number,
  loanPeriod: number
): number => {
  return (creditModifier / loanAmount) * loanPeriod
}

export const calculateMaxLoanAmount = (loanPeriod: number, creditModifier: number): number => {
  return loanPeriod * creditModifier
}

export const calculateSuitableLoanPeriod = (loanAmount: number, creditModifier: number): number => {
  return loanAmount / creditModifier
}
