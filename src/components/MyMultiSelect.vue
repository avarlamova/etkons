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
      @click="clearSelection"
      class="absolute right-0 mr-5"
      icon="pi pi-times"
      text
    />
  </div>
</template>

<script>
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";

export default {
  name: "MyMultiSelect",
  components: {
    MultiSelect,
    Button,
  },

  data() {
    return {
      selectedCities: [],
      cities: ["Moscow", "London", "Bangkok"],
    };
  },
  methods: {
    clearSelection() {
      this.selectedCities = [];
    },
  },
  computed: {
    showClearSelectionBtn() {
      return this.selectedCities.length > 0;
    },
  },
};
</script>

<style scoped></style>
