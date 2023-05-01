import { mount } from "@vue/test-utils";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import MultilineText from "../../src/components/MultilineText.vue";
import PrimeVue from "primevue/config";

let wrapper = null;
beforeEach(() => {
  wrapper = mount(MultilineText, {
    global: {
      components: { DataTable, Column },
      plugins: [PrimeVue],
    },
  });
});

afterEach(() => {
  wrapper.unmount();
});

describe("MultilineText", () => {
  it("renders a DataTable component", () => {
    expect(wrapper.findComponent(DataTable).exists()).toBe(true);
  });

  it("renders the correct number of columns", () => {
    const expectedColumns = ["Id", "Multiline text", "Normal text"];
    const renderedColumns = wrapper
      .findAllComponents(Column)
      .map((c) => c.props("header"));
    expect(renderedColumns).toEqual(expectedColumns);
    expect(renderedColumns).toHaveLength(3);
  });

  it("displays the correct data in the column headers", () => {
    const dataTable = wrapper.findComponent(DataTable);
    const rows = dataTable.findAll("tbody > tr");
    const rowData = rows.at(0).findAll("td");
    expect(rowData.at(0).text()).toBe("1");
    expect(rowData.at(1).text()).toContain("[13:36:53]");
    expect(rowData.at(2).text()).toContain("Just orginary text");
  });

  it("correctly formats the multiline text column", () => {
    const dataTable = wrapper.findComponent(DataTable);
    const rows = dataTable.findAll("tbody > tr");
    const rowData = rows.at(0).findAll("td");
    const formattedText = rowData.at(1).findAll("div");
    expect(formattedText.at(0).text()).toBe(
      "[13:36:53] Расчетное время: 9 мин"
    );
    expect(formattedText.at(1).text()).toBe(
      "[13:36:58] Открыть клапан откачки К1"
    );
  });
});
