import { mount } from "@vue/test-utils";
import MyMultiSelect from "../../src/components/MyMultiSelect";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";

let wrapper = null;
beforeEach(() => {
  wrapper = mount(MyMultiSelect, {
    global: {
      components: { MultiSelect, Button },
      plugins: [PrimeVue],
      directives: { Tooltip: Tooltip },
    },
  });
});

afterEach(() => {
  wrapper.unmount();
});

describe("MyMultiSelect", () => {
  it("renders component correctly", () => {
    const multiSelect = wrapper.get('[data-test="multiSelect"');
    expect(multiSelect.exists()).toBe(true);
  });

  it("displays  clear selection button when there are selected cities", async () => {
    wrapper.vm.selectedCities = ["Moscow"];
    await wrapper.vm.$nextTick();
    const clearSelectionBtn = wrapper.find('[data-test="clearSelectionBtn"]');
    expect(clearSelectionBtn.exists()).toBe(true);
  });

  it("clears selection when clicking on clear selection button", async () => {
    wrapper.vm.selectedCities = ["Moscow", "London"];
    await wrapper.vm.$nextTick();
    const clearSelectionBtn = wrapper.find('[data-test="clearSelectionBtn"]');
    clearSelectionBtn.trigger("click");
    expect(wrapper.vm.selectedCities.length).toBe(0);
  });
});
