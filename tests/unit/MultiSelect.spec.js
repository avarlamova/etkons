import { mount } from "@vue/test-utils";
import MyMultiSelect from "../../src/components/MyMultiSelect";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";

describe("MyMultiSelect", () => {
  it("renders component correctly", () => {
    const wrapper = mount(MyMultiSelect, {
      global: {
        components: { MultiSelect, Button },
        plugins: [PrimeVue],
        directives: { Tooltip: Tooltip },
      },
    });

    const multiSelect = wrapper.get('[data-test="multiSelect"');
    expect(multiSelect.exists()).toBe(true);
  });
});
