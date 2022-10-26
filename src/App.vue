<template>
  <!-- <Counter title="Ingreso" />
  <Counter title="Salida" /> -->
  <!-- <Counter :start="0" /> -->
  <Indecision />
</template>

<script>
import Counter from "./components/Counter.vue";
import Indecision from "./components/Indecision.vue";

export default {
  name: "App",
  components: {
    // Counter,
    Indecision,
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
