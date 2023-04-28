<template>
  <div class="link-input" :class="{ editing: isEditing }">
    <InputMask
      v-model="url"
      mask="https://***********************"
      class="form-control"
      placeholder="https://"
      type="text"
      @blur="fetchLinkTitle"
    />
    <!-- <span v-if="!isEditing">
      <a :href="url" target="_blank">{{ linkTitle }}</a>
      <i class="pi pi-pencil" @click="editLink"></i>
    </span>
    <span v-else>
      <InputMask v-model="url" mask="https://*" class="form-control" />
      <button class="btn btn-success" @click="saveLink">Save</button>
      <button class="btn btn-danger" @click="cancelEditing">Cancel</button>
    </span> -->
  </div>
</template>

<script>
import InputMask from "primevue/inputmask";
// import axios from "axios";

export default {
  name: "LinkInput",
  components: {
    InputMask,
  },
  data() {
    return {
      url: "",
      linkTitle: "",
      isEditing: false,
    };
  },
  methods: {
    async fetchLinkTitle() {
      if (this.url) {
        // const options = {
        //   method: "GET",
        //   url: "http://localhost:3001/getTitle",
        //   params: {
        //     website: this.url,
        //   },
        // };
        // axios
        //   .request(options)
        //   .then((response) => {
        //     const title = response.data.match(
        //       /<title[^>]*>([^<]+)<\/title>/
        //     )[1];
        //     console.log(title, response.data);
        //     this.linkTitle = title;
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     alert("An error occured when requesting data");
        //   });
      }
      // if (this.url) {
      //   try {
      //     const response = await fetch(this.url);
      //     const html = await response.text();
      //     const title = html.match(/<title[^>]*>([^<]+)<\/title>/)[1];
      //     this.linkTitle = title;
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
    },
    editLink() {
      this.isEditing = true;
    },
    saveLink() {
      this.isEditing = false;
    },
    cancelEditing() {
      this.isEditing = false;
      this.url = "";
      this.linkTitle = "";
    },
    // mounted() {
    //   this.mask = ;
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
