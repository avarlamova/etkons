<template>
  <LinkField />
  <DateTime />
  <MyMultiSelect />
</template>

<script>
import LinkField from "./components/LinkField.vue";
import DateTime from "./components/DateTime.vue";
import MyMultiSelect from "./components/MyMultiSelect.vue";

export default {
  name: "App",
  components: {
    LinkField,
    DateTime,
    MyMultiSelect,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
