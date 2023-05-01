<template>
  <DataTable :value="text">
    <Column field="id" header="Id"></Column>
    <Column field="text" header="Multiline text">
      <template #body="slotProps">
        <tr v-for="text in formattedText(slotProps.data.text)" :key="text">
          {{
            text
          }}
        </tr>
      </template>
    </Column>
    <Column field="normalText" header="Normal text"></Column>
  </DataTable>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Column from "primevue/column";
import { IMultiText } from "../types";

const text = ref<IMultiText[]>([
  {
    id: 1,
    normalText:
      "Just orginary text no multilines Just orginary text no multilines Just orginary text no multilines Just orginary text no multilines",
    text: `[13:36:53] Расчетное время: 9 мин[13:36:58] Открыть клапан откачки К1[13:36:58] Включить вакуумный насос[13:36:58] Закрыть клапан К5[13:36:58] Закрыть клапан дистилляции К2[13:36:58] Ожидание: 8 с[13:37:06] Заливка 2.2мл. в испаритель[13:37:06] Заданно 26.50602409638554 шагов[13:37:09] Заливка перекиси завершена[13:37:09] Открыть клапан дистилляции К2[13:42:09] Включить нагрев испарителя[13:42:09] Закрыть клапан дистилляции К2[13:42:09] конечное давление1.0960040758227925 торр[13:42:09] Выпаривание через К2[13:42:09] Выпаривание длилось5 мин[13:42:09] Откачка до 1 торр[13:42:15] Закрыть клапан откачки К1[13:43:09] Открыть клапан откачки К1[13:43:14] Аппаратное смещение 0 денсит. = -0.313683180809021[13:43:14] Закрыть клапан дистилляции К2
`,
  },
]);

const formattedText = (value: string) => {
  return value.split(/(?=\[[0-9]{2}:[0-9]{2}:[0-9]{2}\])/);
};
</script>

<style></style>
