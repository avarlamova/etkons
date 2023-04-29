<template>
  <div class="p-inputgroup">
    <!-- <label for="datepicker">Время</label> -->
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

<script>
import Calendar from "primevue/calendar";
export default {
  name: "DateTime",
  components: { Calendar },

  data() {
    return {
      time: null,
    };
  },
  //   watch: {
  //     value(newValue) {
  //       this.time = new Date(`2000-01-01T${newValue}`);
  //     },
  //     date(newDate) {
  //       if (newDate) {
  //         const formattedDate = newDate.toISOString().substr(11, 5);
  //         this.$emit("update:value", formattedDate);
  //       } else {
  //         this.$emit("update:value", null);
  //       }
  //     },
  //   },
  methods: {
    setCurrentTime() {
      this.time = new Date();
    },
    resetValue() {
      this.time = null;
    },
  },
};
</script>
