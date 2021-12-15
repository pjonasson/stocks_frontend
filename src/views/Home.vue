<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <button v-on:click="search">Click Here to test!</button>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
    };
  },
  created: function () {},
  methods: {
    search: function () {
      axios.get("http://localhost:3000/stocks/aa").then((response) => console.log("Test", response.data));
    },
  },
};
</script>
