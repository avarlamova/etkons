<template>
  <!-- <LinkField />
  <DateTime />
  <MyMultiSelect />
  <MultilineText /> -->
  <SearchTable />
</template>

<script>
import LinkField from "./components/LinkField.vue";
import DateTime from "./components/DateTime.vue";
import MyMultiSelect from "./components/MyMultiSelect.vue";
import MultilineText from "./components/MultilineText.vue";
import SearchTable from "./components/SearchTable.vue";

export default {
  name: "App",
  components: {
    LinkField,
    DateTime,
    MyMultiSelect,
    MultilineText,
    SearchTable,
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
