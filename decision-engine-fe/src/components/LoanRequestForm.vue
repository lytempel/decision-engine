<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="error-section">
        <div class="error" v-if="showError">{{ error }}</div>
      </div>
      <FormInput
        label="Personal code"
        type="text"
        v-model="personalCode"
        name="personalCode"
        placeholder="Personal code"
      />
      <FormInput
        label="Loan amount (€)"
        type="number"
        v-model="loanAmount"
        name="loanAmount"
        placeholder="Loan amount in €"
      />
      <FormInput
        label="Loan period (in months)"
        type="number"
        v-model="loanPeriod"
        name="loanPeriod"
        placeholder="Loan period in months"
      />
      <div class="buttons">
        <button type="button" class="btn btn-outline-primary clear" @click="clearForm()">
          Clear
        </button>
        <input type="submit" value="Submit" class="btn btn-primary submit" />
      </div>
      <DecisionSection
        :showDecision="showDecision"
        :decision="decision"
        :approvedAmount="approvedAmount"
        :approvedPeriod="approvedPeriod"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Decision, Segmentation } from '../helpers/models'
import PersonService from '../PersonService'
import {
  findCreditModifier,
  calculateCreditScore,
  calculateMaxLoanAmount,
  calculateSuitableLoanPeriod
} from '../helpers/calculations'
import { MIN_SUM, MAX_SUM, MIN_PERIOD, MAX_PERIOD } from '../helpers/constants'
import { validatePersonalCode, validateLoanAmount, validateLoanPeriod } from '../helpers/validation'
import FormInput from './FormInput.vue'
import DecisionSection from './DecisionSection.vue'

const personalCode = ref('')
const loanAmount = ref()
const loanPeriod = ref()
const decision = ref('')
const approvedAmount = ref<number | undefined>(undefined)
const approvedPeriod = ref<number | undefined>(undefined)
const showDecision = ref(false)
const showError = ref(false)
const error = ref('')

function isFormValid() {
  const personalCodeValidation = validatePersonalCode(personalCode.value)
  const loanAmountValidation = validateLoanAmount(loanAmount.value)
  const loanPeriodValidation = validateLoanPeriod(loanPeriod.value)

  if (!personalCodeValidation.isValid) {
    error.value = personalCodeValidation.error
    return false
  } else if (!loanAmountValidation.isValid) {
    error.value = loanAmountValidation.error
    return false
  } else if (!loanPeriodValidation.isValid) {
    error.value = loanPeriodValidation.error
    return false
  }
  return true
}

function resetDecisionData() {
  showDecision.value = false
  showError.value = false
  approvedAmount.value = 0
}

function clearForm() {
  resetDecisionData()
  personalCode.value = ''
  loanAmount.value = undefined
  loanPeriod.value = undefined
}

async function onSubmit() {
  resetDecisionData()

  if (isFormValid()) {
    const person = await PersonService.getPerson(personalCode.value)

    if (person) {
      if (person.segmentation === Segmentation.debt) {
        decision.value = Decision.negative
        approvedAmount.value = 0
        approvedPeriod.value = 0
      } else {
        const creditModifier = findCreditModifier(person.segmentation)
        const creditScore = calculateCreditScore(creditModifier, loanAmount.value, loanPeriod.value)

        if (creditScore === 1) {
          decision.value = Decision.positive
          approvedAmount.value = loanAmount.value
          approvedPeriod.value = loanPeriod.value
        } else {
          const maxLoanAmount = calculateMaxLoanAmount(loanPeriod.value, creditModifier)

          if (maxLoanAmount >= MIN_SUM && maxLoanAmount <= MAX_SUM) {
            decision.value = Decision.positive
            approvedAmount.value = maxLoanAmount
            approvedPeriod.value = loanPeriod.value
          } else if (maxLoanAmount > MAX_SUM) {
            decision.value = Decision.positive
            approvedAmount.value = MAX_SUM
            approvedPeriod.value = loanPeriod.value
          } else {
            findNewSuitablePeriod(creditModifier)
          }
        }
      }
      showDecision.value = true
    } else {
      showError.value = true
      error.value = 'Inserted personal code is unknown'
    }
  } else {
    showError.value = true
    return
  }

  function findNewSuitablePeriod(creditModifier: number) {
    const suitableLoanPeriod = calculateSuitableLoanPeriod(loanAmount.value, creditModifier)

    if (
      Number.isInteger(suitableLoanPeriod) &&
      suitableLoanPeriod >= MIN_PERIOD &&
      suitableLoanPeriod <= MAX_PERIOD
    ) {
      decision.value = Decision.positive
      approvedAmount.value = loanAmount.value
      approvedPeriod.value = suitableLoanPeriod
    } else {
      decision.value = Decision.negative
      approvedAmount.value = 0
      approvedPeriod.value = 0
    }
  }
}
</script>

<style scoped>
form {
  background-color: rgb(243, 238, 251);
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 3rem;
  max-width: 100%;
  text-align: center;
  width: 40rem;
}

.buttons {
  align-items: center;
  display: flex;
  margin-top: 2rem;
  padding: 0.375rem 0.75rem;
}

.clear {
  margin-bottom: 0.5rem;
  margin-right: 1rem;
  padding: 1rem 0.5rem;
}

.submit {
  margin-bottom: 0.5rem;
  padding: 1rem 0.5rem;
}

.btn {
  border-radius: 0.5rem;
  width: 50%;
}

.form-control {
  background-color: inherit;
  border: none;
}

.btn-primary {
  background: #2b0a57;
  border-color: #2b0a57;
}

.btn-outline-primary {
  color: #2b0055;
  background: transparent;
  border-color: #2b0055;
}

.btn-outline-primary:hover {
  color: #fff;
  background: #2b0055;
  border-color: #2b0055;
}

.btn-primary:hover {
  background: #5948ad;
  border-color: #5948ad;
}

.error-section {
  height: 2rem;
  margin-bottom: 1rem;
}
.error {
  color: red;
}
</style>
