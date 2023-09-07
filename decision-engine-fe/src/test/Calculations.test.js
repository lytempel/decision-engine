import { expect, test } from 'vitest'
import {
  findCreditModifier,
  calculateMaxLoanAmount,
  calculateSuitableLoanPeriod,
  calculateCreditScore
} from '../helpers/calculations'
import { Segmentation } from '../helpers/models'
import { describe } from 'node:test'

describe('findCreditModifier', () => {
  test('debt should return 0', () => {
    expect(findCreditModifier(Segmentation.debt)).toBe(0)
  })

  test('segmentation 1 should return 100', () => {
    expect(findCreditModifier(Segmentation.segment_1)).toBe(100)
  })

  test('segmentation 2 should return 300', () => {
    expect(findCreditModifier(Segmentation.segment_2)).toBe(300)
  })

  test('segmentation 3 should return 1000', () => {
    expect(findCreditModifier(Segmentation.segment_3)).toBe(1000)
  })
})

test('credit score should be 1', () => {
  expect(calculateCreditScore(findCreditModifier(Segmentation.segment_1), 2000, 20)).toBe(1)
})

test('max loan amount should be 6000', () => {
  expect(calculateMaxLoanAmount(60, 100)).toBe(6000)
})

test('suitable loan period should be 20 months', () => {
  expect(calculateSuitableLoanPeriod(2000, 100)).toBe(20)
})
