<template>
  <div id="app">
    
     <Base/>
     <Search-Bar/>
    <router-view/>
   
  </div>
</template>

<script>
import Base from '@/components/Base.vue'
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'App',
    components: {
      Base,
      SearchBar
    },
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}
</style>
