<template>
  <div class="decision">
    <div v-if="showDecision">
      <div :class="decision === Decision.positive ? 'positive' : 'negative'">
        <span class="decision-label">Decision: </span> {{ decision }}
      </div>
      <div><span class="decision-label">Approved amount:</span> {{ approvedAmount }} €</div>
      <div><span class="decision-label">Approved period:</span> {{ approvedPeriod }} months</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Decision } from '../helpers/models'

defineProps<{
  showDecision: boolean
  decision: string
  approvedAmount: number | undefined
  approvedPeriod: number | undefined
}>()
</script>

<style scoped>
.decision {
  color: #413c3c;
  font-size: 1.125rem;
  margin-left: 0.75rem;
  margin-top: 2rem;
  text-align: left;
}

.decision-label {
  color: #9c9c9c;
  font-size: 0.875rem;
}

.negative {
  color: red;
}

.positive {
  color: green;
}
</style>
