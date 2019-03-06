<template>
  <div class="Base">
    <div>
      <b-navbar toggleable="lg" type="light" variant="light" class="white uborder">
         
        <b-navbar-brand  @click="navigateTo({name:'index'})" href="#" style="color:rgba(0, 0, 0, 0.69);">
          <span style=" margin-left:3px;
                        color:rgba(0, 0, 0, 0.42);
                        font-size:18px;">
          like
          </span>YouTube
          <span style=" margin-left:3px;  
                        color:rgba(0, 0, 0, 0.42);
                        font-size:18px;">
            but only search
          </span>
        </b-navbar-brand>
       
      </b-navbar>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Base',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
     methods: {
      navigateTo(route) {
        this.$router.push(route)
      }
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    border-bottom: 4px solid #F5F5F5 !important;
  }

</style>
