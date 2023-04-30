<template>
  <div class="p-inputgroup relative">
    <MultiSelect
      data-test="multiSelect"
      v-model="selectedCities"
      :options="cities"
      display="chip"
      placeholder="Select Cities"
    />
    <Button
      data-test="clearSelectionBtn"
      v-if="showClearSelectionBtn"
      v-tooltip.left="'Click to clear selection'"
      @click="clearSelection"
      class="absolute right-0 mr-5"
      icon="pi pi-times"
      text
    />
  </div>
</template>

<script setup lang="ts">
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import { ref, computed } from "vue";

const selectedCities = ref<string[]>([]);
const cities = ["Moscow", "London", "Bangkok", "Vancouver", "Beijing", "Tokyo"];

const clearSelection = () => {
  selectedCities.value = [];
};
const showClearSelectionBtn = computed<boolean>(() => {
  return selectedCities.value.length > 0;
});
</script>

<style scoped>
@media screen and (min-width: 700px) {
  .p-inputgroup {
    max-width: 70%;
    margin: 0 auto;
  }
}
</style>
