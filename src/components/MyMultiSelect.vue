<template>
  <div class="p-inputgroup relative">
    <MultiSelect
      v-model="selectedCities"
      :options="cities"
      display="chip"
      placeholder="Select Cities"
    />
    <Button
      v-if="showClearSelectionBtn"
      v-tooltip.left="'Click to clear selection'"
      @click="clearSelection"
      class="absolute right-0 mr-5"
      icon="pi pi-times"
      text
    />
  </div>
</template>

<script setup>
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import { ref, computed } from "vue";

const selectedCities = ref([]);
const cities = ["Moscow", "London", "Bangkok", "Vancouver", "Beijing", "Tokyo"];

const clearSelection = () => {
  selectedCities.value = [];
};
const showClearSelectionBtn = computed(() => {
  return selectedCities.value.length > 0;
});
</script>

<style scoped></style>
