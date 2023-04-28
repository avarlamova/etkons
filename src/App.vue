<template>
  <LinkField />
  <DateTime />
</template>

<script>
import LinkField from "./components/LinkField.vue";
import DateTime from "./components/DateTime.vue";

export default {
  name: "App",
  components: {
    LinkField,
    DateTime,
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
