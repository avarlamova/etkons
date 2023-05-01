<template>
  <div>
    <div class="flex align-items-center justify-content-center">
      <!-- <InputMask
        data-test="inputMask"
        v-if="!hasLink || isEditing"
        v-model="url"
        mask="*****.***"
        class="form-control"
        placeholder="https://"
        type="text"
        autoClear
        @blur="fetchLinkTitle"
      /> -->
      <InputText
        v-if="!hasLink || isEditing"
        data-test="inputField"
        v-model="url"
        placeholder="https://"
        @blur="fetchLinkTitle"
        pattern="^https:\/\/.*$"
        :class="{ 'p-invalid': !isLinkValid }"
      />

      <a
        v-if="hasLink && !isEditing"
        data-test="linkTitle"
        :href="url"
        target="_blank"
        >{{ linkTitle }}</a
      >

      <Button
        data-test="editBtn"
        v-if="hasLink && !isEditing"
        text
        icon="pi pi-pencil"
        aria-label="Edit link"
        @click="editLink"
      />

      <Button
        data-test="saveBtn"
        v-if="isEditing"
        text
        icon="pi pi-check"
        aria-label="Save"
        @click="saveLink"
      />
      <Button
        data-test="cancelBtn"
        v-if="isEditing"
        text
        icon="pi pi-times"
        aria-label="Cancel"
        @click="cancelEditing"
      />
    </div>
  </div>
  <ProgressSpinner
    data-test="spinner"
    class="mt-4"
    v-if="isLoading"
    aria-label="Loading"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import axios, { AxiosError, AxiosResponse } from "axios";
import { IExampleWebsite, IResponse } from "../types";

const url = ref<string>("");
const prevUrl = ref<string>("");
const linkTitle = ref<string>("");
const isEditing = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const hasLink = computed(() => {
  return linkTitle.value && url.value;
});

const isLinkValid = computed(() => {
  if (url.value.length > 0) {
    const urlRegExp = /^https:\/\/.*/i;
    return urlRegExp.test(url.value);
  }
  return true;
});

const fetchLinkTitle = () => {
  if (url.value && !isEditing.value) {
    isLoading.value = true;

    axios
      // .get("http://localhost:3001/getTitle", {
      .get<string>("https://ek-backend.onrender.com/getTitle", {
        params: { website: `${url.value}` },
      })
      .then((response: AxiosResponse<string>) => {
        const parser = new DOMParser();
        const title = parser.parseFromString(response.data, "text/html").title;
        linkTitle.value = title;
      })
      .catch((err: AxiosError<string | IResponse>) => {
        // console.log(err.response);
        url.value = "";
        linkTitle.value = "";
        if (typeof err.response?.data !== "string") {
          if (err.response?.data?.error === "No such website") {
            alert(err.response.data.error);
          }
        } else {
          alert("An error occured when requesting data");
        }
      })
      .finally(() => (isLoading.value = false));
  }
};

const editLink = () => {
  isEditing.value = true;
  prevUrl.value = url.value;
};

const saveLink = () => {
  isEditing.value = false;
  linkTitle.value = "";
  if (url.value) {
    prevUrl.value = "";
    fetchLinkTitle();
  }
};

const cancelEditing = () => {
  url.value = prevUrl.value;
  isEditing.value = false;
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
