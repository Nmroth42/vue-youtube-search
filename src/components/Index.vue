<template>
  <div class="index">
    <div class="pale_text index_wrapper">
      <br>
      <div class="text_wrapper">
        Project description: Nice search bar + responsive design.
        <hr>
        <input
          class="simple_input"
          type="text"
          :placeholder="textPleceHolderInputApiKey"
          v-model="apiKeyString"
        >
        <span
          class="simple_btn"
          @click="setCustomApiKey()"
        >
          Set custom key</span>
        |
        <span
          class="simple_btn"
          @click="setDefaultApiKey()"
        >Set default key</span>
        <hr>
        <span> You can also select number of search responses.</span>
        <input
          class="simple_input"
          type="text"
          :placeholder="textPlaceHolderInpitMaxSearch"
          v-model="numberOfSearchElement"
        >
        <span
          class="simple_btn"
          @click="setCustomNumberOfSearch()"
        >
          Set number</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      numberOfSearchElement: "",
      apiKeyString: "",
      textPleceHolderInputApiKey: "You can add your API key here.",
      textPlaceHolderInpitMaxSearch: `Now: ${
        this.$store.state.searchMaxResult
      }. Click to focus on input.`
    };
  },
  methods: {
    setCustomApiKey() {
      this.$store.commit("setCustomApiKey", this.apiKeyString);
      this.textPleceHolderInputApiKey = `Your current key: ${
        this.$store.state.apiYoutubeKey
      }`;
      this.apiKeyString = "";
    },
    setDefaultApiKey() {
      this.$store.commit("setDefaultApiKey");
      this.textPleceHolderInputApiKey = "You set default key";
      this.apiKeyString = "";
    },
    setCustomNumberOfSearch() {
      if (this.numberOfSearchElement < 9) {
        this.$store.commit(
          "setCustomSearchMaxResult",
          this.numberOfSearchElement
        );
        this.textPlaceHolderInpitMaxSearch = `Your current number: ${
          this.numberOfSearchElement
        }`;
        this.numberOfSearchElement = "";
      } else {
        this.textPlaceHolderInpitMaxSearch =`Max number is 8. try again.`;
        this.numberOfSearchElement = "";
      }
    }
  }
};
</script>

<style scoped>
.simple_input {
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
  text-align: left;
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
