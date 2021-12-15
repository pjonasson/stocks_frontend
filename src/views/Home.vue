<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <input type="text" v-model="searchStock" />
    <button v-on:click="search">Search for Stock</button>
    <div>
      <div v-for="stock in inquiredStock" v-bind:key="stock.id">
        <h2>Stock Name: {{ stock.name }}</h2>
        <h2>Stock Symbol: {{ stock.symbol }}</h2>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      searchStock: "",
      inquiredStock: [],
    };
  },
  created: function () {},
  methods: {
    search: function () {
      var searchParam = this.searchStock;
      axios.get("http://localhost:3000/stocks/" + searchParam).then((response) => {
        this.inquiredStock = response.data;
        console.log(response.data);
      });
    },
  },
};
</script>
