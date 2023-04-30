<template>
  <ProgressSpinner v-if="isLoading" />
  <DataTable
    v-else
    :value="allProducts"
    v-model:selection="selectedProducts"
    v-model:filters="filters"
    :globalFilterFields="selectedFilters"
    :paginator="true"
    responsiveLayout="stack"
    breakpoint="400px"
    :rows="10"
  >
    <template #empty> No data </template>

    <template #header>
      <div class="flex gap-2">
        <div class="p-inputgroup item1">
          <Button
            @click="openSelectFiltersMenu"
            icon="pi pi-sliders-v"
            severity="success"
            class="relative"
            id="filtersBtn"
          />
          <MultiSelect
            ref="multiSelectRef"
            class="customMultiSelect"
            v-model="selectedFilters"
            :options="columnFilters"
            optionLabel="label"
            optionValue="value"
          />
          <InputText
            placeholder="Поиск"
            v-on:keyup.enter="searchProducts"
            v-model="searchText"
          />
          <span
            v-if="searchText.length > 0"
            class="p-inputgroup-addon resetBtn"
            @click="resetSearch"
          >
            <i class="pi pi-times"></i>
          </span>
          <Button label="Search" severity="info" @click="searchProducts" />
        </div>
        <MultiSelect
          placeholder="Поля таблицы"
          v-model="selectedColumns"
          :options="columns"
          class="item2"
        />
      </div>
    </template>
    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
    <Column
      v-if="checkColumn('Name')"
      field="name"
      sortable
      header="Name"
    ></Column>
    <Column
      v-if="checkColumn('Code')"
      field="code"
      filterField="code"
      sortable
      header="Code"
    ></Column>
    <Column v-if="checkColumn('Image')" header="Image">
      <template #body="slotProps">
        <img
          :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
          :alt="slotProps.data.image"
          class="w-6rem shadow-2 border-round"
        />
      </template>
    </Column>
    <Column
      v-if="checkColumn('Price')"
      filterField="price"
      field="price"
      header="Price"
      sortable
    >
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.price) }}
      </template>
    </Column>
    <Column
      v-if="checkColumn('Category')"
      field="category"
      sortable
      filter-field="category"
      header="Category"
    ></Column>
    <Column
      v-if="checkColumn('Reviews')"
      field="rating"
      sortable
      header="Reviews"
    >
      <template #body="slotProps">
        <Rating :modelValue="slotProps.data.rating" readonly :cancel="false" />
      </template>
    </Column>
    <Column
      v-if="checkColumn('Status')"
      field="inventoryStatus"
      filterField="inventoryStatus"
      header="Status"
      sortable
    >
      <template #body="slotProps">
        <Tag
          :value="slotProps.data.inventoryStatus"
          :severity="getStatusLabel(slotProps.data.inventoryStatus)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";

import Column from "primevue/column";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Rating from "primevue/rating";
import Tag from "primevue/tag";
import axios, { AxiosResponse } from "axios";
import { ref, onMounted, reactive, Ref } from "vue";
import { IProduct, InventoryStatus, IColumnFilter } from "../types";

const multiSelectRef: Ref<null | MultiSelect> = ref(null);

const searchText = ref<string>("");
const selectedFilters = ref<string[]>(["name"]);
const filters = reactive({
  global: { value: "", matchMode: FilterMatchMode.CONTAINS },
});
let allProducts = ref<IProduct[]>([]);
const selectedProducts = ref<IProduct[]>([]);
const columns: string[] = [
  "Name",
  "Code",
  "Image",
  "Price",
  "Category",
  "Reviews",
  "Status",
];
const selectedColumns = ref<string[]>(columns);

const columnFilters = ref<IColumnFilter[]>([
  { value: "name", label: "Name" },
  { value: "code", label: "Code" },
  { value: "price", label: "Price" },
  { value: "category", label: "Category" },
  { value: "inventoryStatus", label: "Status" },
]);

const isLoading = ref<boolean>(false);

function openSelectFiltersMenu() {
  if (multiSelectRef.value) {
    multiSelectRef.value.show();
  }
}

const searchProducts = () => {
  if (searchText.value) {
    filters["global"].value = searchText.value;
  } else {
    filters["global"].value = "";
  }
};

const resetSearch = () => {
  searchText.value = "";
  filters["global"].value = searchText.value;
};
const formatCurrency = (value: number) => {
  if (value)
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  return;
};
const getStatusLabel = (status: InventoryStatus): string => {
  switch (status) {
    case "INSTOCK":
      return "success";

    case "LOWSTOCK":
      return "warning";

    case "OUTOFSTOCK":
      return "danger";
  }
};
const checkColumn = (value: string): boolean => {
  return selectedColumns.value.includes(value);
};
const fetchProducts = () => {
  isLoading.value = true;
  axios
    .get("https://ek-backend.onrender.com/getProducts")
    .then((response: AxiosResponse<IProduct[]>) => {
      const products = response.data;
      if (products.length > 0) {
        allProducts.value = products;
      }
    })
    .catch((error) => {
      console.error(error);
      allProducts.value = [];
    })
    .finally(() => (isLoading.value = false));
};

onMounted(() => {
  fetchProducts();
});
</script>

<style>
.item1 {
  width: 80%;
}
.item2 {
  width: 20%;
}

.resetBtn:hover {
  cursor: pointer;
  color: black;
}
.customMultiSelect.p-multiselect {
  visibility: hidden;
  position: absolute;
}
</style>
