<template>
  <div class="index">
    <div class="pale_text index_wrapper">
      <br>
      <div class="text_wrapper">
        Project description: Nice search bar + responsive design.
        <hr>
        <input
          class="input_api"
          type="text"
          :placeholder="textPleceHolderInput"
          v-model="apiKeyString"
        >
        <span
          class="simple_btn"
          @click="setCustomApiKey()"
        > Set your key</span>
        |
        <span
          class="simple_btn"
          @click="setDefaultApiKey()"
        >Set default key</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      apiKeyString: "",
      textPleceHolderInput: "You can add your API key here."
    };
  },
  methods: {
    setCustomApiKey() {
      this.$store.commit("setCustomApiKey", this.apiKeyString);
      this.textPleceHolderInput = `Your current key: ${
        this.$store.state.apiYoutubeKey
      }`;
      this.apiKeyString = "";
    },
    setDefaultApiKey() {
      this.$store.commit("setDefaultApiKey");
      this.textPleceHolderInput = "You set default key";
      this.apiKeyString = "";
    }
  }
};
</script>

<style scoped>
.input_api {
  background: white;
  color: black;
  width: 240px;
  border: none;
}
.Index {
  position: fixed;
  width: 100%;
}

.pale_text {
  color: rgba(0, 0, 0, 0.42);
}
.text_wrapper {
  margin: auto;
  width: 240px;
}
.index_wrapper {
  width: 100%;
  height: 0px !important;
}
.simple_btn:hover {
  color: rgba(0, 0, 0, 0.81);
  cursor: pointer;
}
</style>
