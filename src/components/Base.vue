<template>
  <div class="base">
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
      class="white uborder"
    >
      <b-navbar-brand
        @click="navigateTo({ name: 'index' })"
        href="#"
        class="brand_plain_text"
      >
        <span class="brand_pale_text">like</span>YouTube
        <span class="brand_pale_text">but only search</span>
      </b-navbar-brand>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Base",
  methods: {
    navigateTo(route) {
      this.$store.commit("makeSearchClear");
      this.$router.push(route);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.brand_pale_text {
  color: rgba(0, 0, 0, 0.42);
  font-size: 18px;
  padding-right: 5px;
}
.brand_plain_text {
  color: rgba(0, 0, 0, 0.69) !important;
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

.white {
  background: rgba(255, 255, 255, 0.719) !important;
}

.uborder {
  border-bottom: 4px solid #f5f5f5 !important;
}
</style>
