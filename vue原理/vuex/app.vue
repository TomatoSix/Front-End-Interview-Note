<template>
  <div>
    <h2>{{ $store.state.name }}</h2>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    addAge() {
      this.$store.commit("syncAdd", 1);
    },
    reduce() {
      this.$store.dispatch("asyncReduce", 20);
    },
  },
};
</script>

<style lang="scss" scoped></style>
