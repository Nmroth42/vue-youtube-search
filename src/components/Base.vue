<template>
  <div class="base">
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
      class="white uborder"
    >
      <b-navbar-brand
        @click="clearSearchBar"
        class="brand_plain_text"
      >
        <router-link to="/">
          <span class="brand_pale_text">like </span>YouTube
          <span class="brand_pale_text">but only search</span>
        </router-link>
      </b-navbar-brand>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Base",
  methods: {
    clearSearchBar() {
      this.$store.commit("makeSearchClear");
    }
  }
};
</script>

<style scoped>
.brand_pale_text {
  color: rgba(0, 0, 0, 0.42);
  font-size: 18px;
}
a:hover{
  text-decoration: none;
}

.brand_plain_text {
  color: rgba(0, 0, 0, 0.69) ;
}

h1,
h2 {
  font-weight: normal;
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
a:hover{
  color:#42b983 !important;
}

.white {
  background: rgba(255, 255, 255, 0.719) !important;
}

.uborder {
  border-bottom: 4px solid #f5f5f5 !important;
}
</style>
