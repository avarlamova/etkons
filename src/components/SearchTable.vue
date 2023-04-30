<template>
  <DataTable
    :value="products"
    v-model:selection="selectedProduct"
    v-model:filters="filters"
    :globalFilterFields="selectedFilters"
    :paginator="true"
    responsiveLayout="stack"
    breakpoint="400px"
    :rows="10"
  >
    <!--  -->

    <!-- <Column
        v-for="column in columns"
        :key="column.id"
        :field="column"
        :header="column"
        sortable
      ></Column> -->
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
            ref="mselect"
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
          <!--  -->
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
      filterField="getStatusLabel(status)"
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
  <!-- <MultiSelect /> <Button /> -->
</template>

<script>
import { FilterMatchMode } from "primevue/api";

import Column from "primevue/column";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Rating from "primevue/rating";
import Tag from "primevue/tag";

export default {
  name: "SearchTable",
  components: {
    MultiSelect,
    Column,
    InputText,
    Rating,
    Tag,
  },
  data() {
    return {
      searchText: "",
      selectedColumns: [],
      selectedFilters: ["name"],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        // name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        // code: { value: null, matchMode: FilterMatchMode.CONTAINS },
        // price: { value: null, matchMode: FilterMatchMode.CONTAINS },
        // category: { value: null, matchMode: FilterMatchMode.CONTAINS },
        // status: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      products: [
        {
          id: "1000",
          code: "f230fh0g3",
          name: "Bamboo Watch",
          description: "Product Description",
          image: "bamboo-watch.jpg",
          price: 65,
          category: "Accessories",
          quantity: 24,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1001",
          code: "nvklal433",
          name: "Black Watch",
          description: "Product Description",
          image: "black-watch.jpg",
          price: 72,
          category: "Accessories",
          quantity: 61,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1002",
          code: "zz21cz3c1",
          name: "Blue Band",
          description: "Product Description",
          image: "blue-band.jpg",
          price: 79,
          category: "Fitness",
          quantity: 2,
          inventoryStatus: "LOWSTOCK",
          rating: 3,
        },
        {
          id: "1003",
          code: "244wgerg2",
          name: "Blue T-Shirt",
          description: "Product Description",
          image: "blue-t-shirt.jpg",
          price: 29,
          category: "Clothing",
          quantity: 25,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1004",
          code: "h456wer53",
          name: "Bracelet",
          description: "Product Description",
          image: "bracelet.jpg",
          price: 15,
          category: "Accessories",
          quantity: 73,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1005",
          code: "av2231fwg",
          name: "Brown Purse",
          description: "Product Description",
          image: "brown-purse.jpg",
          price: 120,
          category: "Accessories",
          quantity: 0,
          inventoryStatus: "OUTOFSTOCK",
          rating: 4,
        },
        {
          id: "1006",
          code: "bib36pfvm",
          name: "Chakra Bracelet",
          description: "Product Description",
          image: "chakra-bracelet.jpg",
          price: 32,
          category: "Accessories",
          quantity: 5,
          inventoryStatus: "LOWSTOCK",
          rating: 3,
        },
        {
          id: "1007",
          code: "mbvjkgip5",
          name: "Galaxy Earrings",
          description: "Product Description",
          image: "galaxy-earrings.jpg",
          price: 34,
          category: "Accessories",
          quantity: 23,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1008",
          code: "vbb124btr",
          name: "Game Controller",
          description: "Product Description",
          image: "game-controller.jpg",
          price: 99,
          category: "Electronics",
          quantity: 2,
          inventoryStatus: "LOWSTOCK",
          rating: 4,
        },
        {
          id: "1009",
          code: "cm230f032",
          name: "Gaming Set",
          description: "Product Description",
          image: "gaming-set.jpg",
          price: 299,
          category: "Electronics",
          quantity: 63,
          inventoryStatus: "INSTOCK",
          rating: 3,
        },
        {
          id: "1010",
          code: "plb34234v",
          name: "Gold Phone Case",
          description: "Product Description",
          image: "gold-phone-case.jpg",
          price: 24,
          category: "Accessories",
          quantity: 0,
          inventoryStatus: "OUTOFSTOCK",
          rating: 4,
        },
        {
          id: "1011",
          code: "4920nnc2d",
          name: "Green Earbuds",
          description: "Product Description",
          image: "green-earbuds.jpg",
          price: 89,
          category: "Electronics",
          quantity: 23,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1012",
          code: "250vm23cc",
          name: "Green T-Shirt",
          description: "Product Description",
          image: "green-t-shirt.jpg",
          price: 49,
          category: "Clothing",
          quantity: 74,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1013",
          code: "fldsmn31b",
          name: "Grey T-Shirt",
          description: "Product Description",
          image: "grey-t-shirt.jpg",
          price: 48,
          category: "Clothing",
          quantity: 0,
          inventoryStatus: "OUTOFSTOCK",
          rating: 3,
        },
        {
          id: "1014",
          code: "waas1x2as",
          name: "Headphones",
          description: "Product Description",
          image: "headphones.jpg",
          price: 175,
          category: "Electronics",
          quantity: 8,
          inventoryStatus: "LOWSTOCK",
          rating: 5,
        },
        {
          id: "1015",
          code: "vb34btbg5",
          name: "Light Green T-Shirt",
          description: "Product Description",
          image: "light-green-t-shirt.jpg",
          price: 49,
          category: "Clothing",
          quantity: 34,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1016",
          code: "k8l6j58jl",
          name: "Lime Band",
          description: "Product Description",
          image: "lime-band.jpg",
          price: 79,
          category: "Fitness",
          quantity: 12,
          inventoryStatus: "INSTOCK",
          rating: 3,
        },
        {
          id: "1017",
          code: "v435nn85n",
          name: "Mini Speakers",
          description: "Product Description",
          image: "mini-speakers.jpg",
          price: 85,
          category: "Clothing",
          quantity: 42,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1018",
          code: "09zx9c0zc",
          name: "Painted Phone Case",
          description: "Product Description",
          image: "painted-phone-case.jpg",
          price: 56,
          category: "Accessories",
          quantity: 41,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1019",
          code: "mnb5mb2m5",
          name: "Pink Band",
          description: "Product Description",
          image: "pink-band.jpg",
          price: 79,
          category: "Fitness",
          quantity: 63,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1020",
          code: "r23fwf2w3",
          name: "Pink Purse",
          description: "Product Description",
          image: "pink-purse.jpg",
          price: 110,
          category: "Accessories",
          quantity: 0,
          inventoryStatus: "OUTOFSTOCK",
          rating: 4,
        },
        {
          id: "1021",
          code: "pxpzczo23",
          name: "Purple Band",
          description: "Product Description",
          image: "purple-band.jpg",
          price: 79,
          category: "Fitness",
          quantity: 6,
          inventoryStatus: "LOWSTOCK",
          rating: 3,
        },
        {
          id: "1022",
          code: "2c42cb5cb",
          name: "Purple Gemstone Necklace",
          description: "Product Description",
          image: "purple-gemstone-necklace.jpg",
          price: 45,
          category: "Accessories",
          quantity: 62,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1023",
          code: "5k43kkk23",
          name: "Purple T-Shirt",
          description: "Product Description",
          image: "purple-t-shirt.jpg",
          price: 49,
          category: "Clothing",
          quantity: 2,
          inventoryStatus: "LOWSTOCK",
          rating: 5,
        },
        {
          id: "1024",
          code: "lm2tny2k4",
          name: "Shoes",
          description: "Product Description",
          image: "shoes.jpg",
          price: 64,
          category: "Clothing",
          quantity: 0,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1025",
          code: "nbm5mv45n",
          name: "Sneakers",
          description: "Product Description",
          image: "sneakers.jpg",
          price: 78,
          category: "Clothing",
          quantity: 52,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1026",
          code: "zx23zc42c",
          name: "Teal T-Shirt",
          description: "Product Description",
          image: "teal-t-shirt.jpg",
          price: 49,
          category: "Clothing",
          quantity: 3,
          inventoryStatus: "LOWSTOCK",
          rating: 3,
        },
        {
          id: "1027",
          code: "acvx872gc",
          name: "Yellow Earbuds",
          description: "Product Description",
          image: "yellow-earbuds.jpg",
          price: 89,
          category: "Electronics",
          quantity: 35,
          inventoryStatus: "INSTOCK",
          rating: 3,
        },
        {
          id: "1028",
          code: "tx125ck42",
          name: "Yoga Mat",
          description: "Product Description",
          image: "yoga-mat.jpg",
          price: 20,
          category: "Fitness",
          quantity: 15,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1029",
          code: "gwuby345v",
          name: "Yoga Set",
          description: "Product Description",
          image: "yoga-set.jpg",
          price: 20,
          category: "Fitness",
          quantity: 25,
          inventoryStatus: "INSTOCK",
          rating: 8,
        },
      ],
      //   filterItems: [
      //     {
      //       label: "Name",
      //       command: () => {
      //         // toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
      //       },
      //     },
      //     {
      //       label: "Code",
      //       command: () => {
      //         // toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
      //       },
      //     },
      //     {
      //       label: "Price",
      //       command: () => {
      //         // toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
      //       },
      //     },
      //     {
      //       label: "Category",
      //       command: () => {
      //         // toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
      //       },
      //     },
      //     {
      //       label: "Reviews",
      //       command: () => {
      //         // toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
      //       },
      //     },
      //     {
      //       label: "Status",
      //       command: () => {
      //         // toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
      //       },
      //     },
      //   ],
      selectedProduct: null,
      columns: [
        "Name",
        "Code",
        "Image",
        "Price",
        "Category",
        "Reviews",
        "Status",
      ],
      columnFilters: [
        { value: "name", label: "Name" },
        { value: "code", label: "Code" },
        { value: "price", label: "Price" },
        { value: "category", label: "Category" },
        { value: "status", label: "Status" },
      ],
    };
  },
  methods: {
    openSelectFiltersMenu() {
      this.$refs.mselect.show();
    },
    searchProducts() {
      if (this.searchText) {
        this.filters["global"].value = this.searchText;
      }
    },
    resetSearch() {
      this.searchText = "";
      this.filters["global"].value = this.searchText;
    },
    formatCurrency(value) {
      if (value)
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      return;
    },
    // getSeverity(status) {
    //   switch (status) {
    //     case "unqualified":
    //       return "danger";

    //     case "qualified":
    //       return "success";

    //     case "new":
    //       return "info";

    //     case "negotiation":
    //       return "warning";

    //     case "renewal":
    //       return null;
    //   }
    // },
    getStatusLabel(status) {
      switch (status) {
        case "INSTOCK":
          return "success";

        case "LOWSTOCK":
          return "warning";

        case "OUTOFSTOCK":
          return "danger";

        default:
          return null;
      }
    },
    checkColumn(value) {
      return this.selectedColumns.includes(value);
    },
    toggle(event) {
      this.$refs.menu.show(event);
    },
  },
  created() {
    // display all columns by default
    this.selectedColumns = [...this.columns];
  },
};
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
  /* display: none; */
}
/* .customMultiSelect.p-multiselect-panel {
  top: 10% !important;
  left: 1% !important;
} */
</style>
