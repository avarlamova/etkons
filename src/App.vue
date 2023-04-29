<template>
  <!-- <LinkField />
  <DateTime />
  <MyMultiSelect />
  <MultilineText /> 
  <SearchTable /> -->
  <div class="card">
    <TabView @tab-change="changeTab" activeIndex="active">
      <TabPanel v-for="tab in tabs" :key="tab.id" :header="tab.label">
        <p>{{ tab.content }}</p>
      </TabPanel>
    </TabView>
    <component :is="currentTab"></component>
  </div>

  <!--  <TabMenu
      v-model:activeIndex="active"
      :model="tabs"
      @tab-change="changeTab(e)"
    /> -->
</template>

<script>
import TabMenu from "primevue/tabmenu";

import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

import LinkField from "./components/LinkField.vue";
import DateTime from "./components/DateTime.vue";
import MyMultiSelect from "./components/MyMultiSelect.vue";
import MultilineText from "./components/MultilineText.vue";
import SearchTable from "./components/SearchTable.vue";

export default {
  name: "App",
  components: {
    TabMenu,
    TabView,
    TabPanel,
    LinkField,
    DateTime,
    MyMultiSelect,
    MultilineText,
    SearchTable,
  },
  data() {
    return {
      active: 1,
      currentTab: "LinkField",
      tabs: [
        { id: 1, label: "LinkField", icon: "pi pi-fw pi-home" },
        {
          id: 2,
          label: "DateTime",
          icon: "pi pi-fw pi-calendar",
          componentName: "DateTime",
        },
        {
          id: 3,
          label: "MultiSelect",
          icon: "pi pi-fw pi-pencil",
          componentName: "MyMultiSelect",
        },
        {
          id: 4,
          label: "MultilineText",
          icon: "pi pi-fw pi-file",
          componentName: "MultilineText",
        },
        {
          id: 5,
          label: "SearchTable*",
          icon: "pi pi-fw pi-cog",
          componentName: "SearchTable",
        },
      ],
    };
  },
  methods: {
    changeTab(event) {
      const { index } = event;
      this.currentTab = this.tabs[index].componentName;
    },
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
