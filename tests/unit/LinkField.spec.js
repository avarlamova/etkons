import { mount } from "@vue/test-utils";
import LinkField from "../../src/components/LinkField";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ProgressSpinner from "primevue/progressspinner";
import axios from "axios";

jest.mock("axios");

let wrapper = null;

beforeEach(() => {
  jest.spyOn(axios, "get").mockResolvedValueOnce({
    ok: true,
  });
  wrapper = mount(LinkField, {
    global: {
      components: { InputText, Button, ProgressSpinner },
      plugins: [PrimeVue],
    },
  });
});

afterEach(() => {
  wrapper.unmount();
});

describe("LinkField", () => {
  it("renders component correctly", () => {
    const wrapper = mount(LinkField, {
      global: {
        components: { InputText, Button, ProgressSpinner },
        plugins: [PrimeVue],
      },
    });
    const inputMask = wrapper.get('[data-test="inputField"]');
    expect(inputMask.exists()).toBe(true);
  });

  it("displays spinner on input blur", async () => {
    expect(wrapper.find('[data-test="spinner"]').exists()).toBe(false);
    const input = wrapper.find('[data-test="inputField"]');
    await input.setValue("");
    // no loading if input is empty
    expect(wrapper.find('[data-test="spinner"]').exists()).toBe(false);
    await input.setValue("example.com");
    await input.trigger("blur");
    expect(wrapper.find('[data-test="spinner"]').exists()).toBe(true);
    expect(axios.get).toHaveBeenCalled();
  });

  it("toggles spinner on loading", async () => {
    wrapper.vm.isLoading = true;
    await wrapper.vm.$nextTick();

    const spinner = wrapper.get('[data-test="spinner"]');
    expect(spinner.exists()).toBe(true);

    wrapper.vm.isLoading = false;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-test="spinner"]').exists()).toBe(false);
  });

  it("displays link and edit buttons if the url is specified", async () => {
    wrapper.vm.linkTitle = "test";
    wrapper.vm.url = "test.com";

    await wrapper.vm.$nextTick();

    const link = wrapper.get('[data-test="linkTitle"]');
    const editBtn = wrapper.get('[data-test="editBtn"]');
    expect(link.exists()).toBe(true);
    expect(editBtn.exists()).toBe(true);
  });

  it("displays save and cancel buttons when being edited and vice versa", async () => {
    expect(wrapper.find('[data-test="saveBtn"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="cancelBtn"]').exists()).toBe(false);
    wrapper.vm.isEditing = true;
    await wrapper.vm.$nextTick();
    const saveBtn = wrapper.get('[data-test="saveBtn"]');
    const cancelBtn = wrapper.get('[data-test="cancelBtn"]');

    expect(cancelBtn.exists()).toBe(true);
    expect(saveBtn.exists()).toBe(true);
  });
});
