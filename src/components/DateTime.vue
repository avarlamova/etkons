<template>
  <div class="p-inputgroup">
    <Calendar v-model="time" id="datepicker" showTime timeOnly hourFormat="24">
      <!-- custom show button bar to correctly set current time -->
      <template #footer>
        <div class="flex justify-content-center">
          <Button
            label="Сегодня"
            aria-label="Today"
            @click="setCurrentTime"
            text
          />
          <Button
            label="Очистить"
            aria-label="Clear"
            @click="resetValue"
            text
          />
        </div>
      </template>
    </Calendar>
    <Button icon="pi pi-calendar" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Calendar from "primevue/calendar";

const time = ref<Date | null>(null);

function setCurrentTime() {
  time.value = new Date();
}

function resetValue() {
  time.value = null;
}
</script>

<style scoped>
@media screen and (min-width: 700px) {
  .p-inputgroup {
    max-width: 30%;
    margin: 0 auto;
  }
}
</style>
