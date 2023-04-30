<template>
  <div class="card">
    <TabView @tab-change="changeTab">
      <TabPanel v-for="tab in tabs" :key="tab.id" :header="tab.label">
      </TabPanel>
    </TabView>
    <KeepAlive>
      <component :is="currentComponent"></component>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

import LinkField from "./components/LinkField.vue";
import DateTime from "./components/DateTime.vue";
import MyMultiSelect from "./components/MyMultiSelect.vue";
import MultilineText from "./components/MultilineText.vue";
import SearchTable from "./components/SearchTable.vue";

import { shallowRef } from "vue";

export interface ITab {
  id: number;
  label: string;
  icon: string;
  component:
    | typeof LinkField
    | typeof DateTime
    | typeof MyMultiSelect
    | typeof MultilineText
    | typeof SearchTable;
}

const tabs: ITab[] = [
  {
    id: 1,
    label: "LinkField",
    icon: "pi pi-fw pi-home",
    component: LinkField,
  },
  {
    id: 2,
    label: "DateTime",
    icon: "pi pi-fw pi-calendar",
    component: DateTime,
  },
  {
    id: 3,
    label: "MultiSelect",
    icon: "pi pi-fw pi-pencil",
    component: MyMultiSelect,
  },
  {
    id: 4,
    label: "MultilineText",
    icon: "pi pi-fw pi-file",
    component: MultilineText,
  },
  {
    id: 5,
    label: "SearchTable*",
    icon: "pi pi-fw pi-cog",
    component: SearchTable,
  },
];
const currentComponent = shallowRef(LinkField);

const changeTab = (event: { index: number }) => {
  const { index } = event;
  currentComponent.value = tabs[index].component;
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
