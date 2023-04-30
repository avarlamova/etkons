<template>
  <div>
    You can try:
    <ul data-test="sitesList">
      <li v-for="website in exampleWebsites" :key="website">{{ website }}</li>
    </ul>
    <div class="flex align-items-center justify-content-center">
      <InputMask
        data-test="inputMask"
        v-if="!hasLink || isEditing"
        v-model="url"
        mask="*****.***"
        class="form-control"
        placeholder="https://"
        type="text"
        autoClear
        @blur="fetchLinkTitle"
      />
      <a v-if="hasLink && !isEditing" :href="computedLink" target="_blank">{{
        linkTitle
      }}</a>

      <Button
        data-test="editBtn"
        v-if="!isEditing && hasLink"
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
import InputMask from "primevue/inputmask";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IExampleWebsite, IResponse } from "../types";

const url = ref<string>("");
const linkTitle = ref<string>("");
const isEditing = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const exampleWebsites: IExampleWebsite = [
  "apple.com",
  "yahoo.com",
  "skype.com",
  "vimeo.com",
  "giphy.com",
];

const hasLink = computed(() => {
  return linkTitle.value && url.value;
});

const computedLink = computed(() => {
  if (hasLink.value) {
    return "https://" + url.value;
  }
  return "";
});

const fetchLinkTitle = () => {
  if (url.value && !isEditing.value) {
    isLoading.value = true;

    axios
      // .get("http://localhost:3001/getTitle", {
      .get<string>("https://ek-backend.onrender.com/getTitle", {
        params: { website: `https://${url.value}` },
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
};

const saveLink = () => {
  cancelEditing();
  fetchLinkTitle();
};

const cancelEditing = () => {
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
