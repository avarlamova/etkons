import { mount } from "@vue/test-utils";
import DateTime from "../../src/components/DateTime";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Calendar from "primevue/calendar";

describe("DateTime", () => {
  it("renders component correctly", () => {
    const wrapper = mount(DateTime, {
      global: {
        components: { Button, Calendar },
        plugins: [PrimeVue],
      },
    });
    const calendarButton = wrapper.get('[data-test="calendarBtn"]');
    expect(wrapper.exists()).toBe(true);
    expect(calendarButton.exists()).toBe(true);
  });
});
