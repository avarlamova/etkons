import { mount, shallowMount } from "@vue/test-utils";
import SearchTable from "../../src/components/SearchTable";
import ProgressSpinner from "primevue/progressspinner";
import DataTable from "primevue/datatable";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import Rating from "primevue/rating";
import Tag from "primevue/tag";
import PrimeVue from "primevue/config";
import axios from "axios";
import { FilterMatchMode } from "primevue/api";

jest.mock("axios");

let wrapper = null;

beforeEach(() => {
  jest.spyOn(axios, "get").mockResolvedValue({
    data: [],
  });
  wrapper = mount(SearchTable, {
    global: {
      components: {
        Column,
        Rating,
        Tag,
        MultiSelect,
        InputText,
        Button,
        ProgressSpinner,
        DataTable,
      },
      plugins: [PrimeVue],
    },
  });
});

afterEach(() => {
  wrapper.unmount();
});
describe("SearchTable", () => {
  it("renders ProgressSpinner when isLoading is true", async () => {
    wrapper.vm.isLoading = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-test="spinner"]').exists()).toBe(true);
  });

  it("component renders correctly", () => {
    expect(wrapper.findComponent(DataTable));
    expect(wrapper.findComponent(Column));
    expect(wrapper.findComponent(InputText));
    expect(wrapper.findComponent(MultiSelect));
    expect(wrapper.findComponent(Rating));
    expect(wrapper.findComponent(Tag));
    const searchBar = wrapper.get('[data-test="searchBar"]');
    expect(searchBar.exists()).toBe(true);
  });

  it("axios call is made to fetch products", () => {
    mount(SearchTable, {
      global: {
        components: {
          Column,
          Rating,
          Tag,
          MultiSelect,
          InputText,
          Button,
          ProgressSpinner,
          DataTable,
        },
        plugins: [PrimeVue],
      },
    });
    expect(axios.get).toHaveBeenCalled();
  });

  it("renders spinner when isLoading is true", async () => {
    wrapper.vm.isLoading = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-test="spinner"]').exists()).toBe(true);
  });

  it("renders DataTable when isLoading is false", async () => {
    wrapper.vm.isLoading = false;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(DataTable).exists()).toBe(true);
  });

  it("renders empty slot when allProducts is empty", async () => {
    wrapper.vm.allProducts = [];
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".p-datatable-emptymessage").exists()).toBe(true);
  });

  it("should display the expected columns", () => {
    const expectedColumns = [
      "",
      "Name",
      "Code",
      "Image",
      "Price",
      "Category",
      "Reviews",
      "Status",
    ];
    const renderedColumns = wrapper
      .findAllComponents(Column)
      .map((c) => c.props("header"));
    expect(renderedColumns).toEqual(expectedColumns);
  });

  it("filters products when searchProducts is called", async () => {
    const expectedFilters = {
      global: { value: "searchText", matchMode: FilterMatchMode.CONTAINS },
    };
    wrapper.vm.searchText = "searchText";
    await wrapper.vm.searchProducts();
    expect(wrapper.vm.filters).toEqual(expectedFilters);
  });

  it("resets search text when reset button is clicked", async () => {
    const spy = jest.spyOn(wrapper.vm, "resetSearch");
    wrapper.vm.searchText = "searchText";
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.searchText).toBe("searchText");
    const resetButton = wrapper.find('[data-test="resetSearchBtn"]');
    await resetButton.trigger("click");
    expect(wrapper.vm.searchText).toBe("");
    expect(spy).toHaveBeenCalled();
  });
});
