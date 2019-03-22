<template>
  <div id="app">
    <Base />
    <Search-Bar />
    <transition name="router-anim">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Base from "@/components/Base.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "App",
  components: {
    Base,
    SearchBar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.router-anim-enter-active {
  animation: coming 1s;
  animation-delay: 0.9s;
  opacity: 0;
}
.router-anim-leave-active {
  animation: going 0.75s;
}
@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>
