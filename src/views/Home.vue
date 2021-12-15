<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <input type="text" v-model="searchStock" />
    <button v-on:click="search">Search for Stock</button>
    <div v-if="inquiredStock.length === 0">
      <div>
        <h1>There are no results for this search. Please try again.</h1>
      </div>
    </div>
    <div v-else-if="inquiredStock[0] != 1" v-for="stock in inquiredStock" v-bind:key="stock.id">
      <h2>Stock Name: {{ stock.name }}</h2>
      <h2>Stock Symbol: {{ stock.symbol }}</h2>
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
      inquiredStock: [1],
    };
  },
  created: function () {},
  methods: {
    search: function () {
      var searchParam = this.searchStock;
      axios.get("http://localhost:3000/stocks/" + searchParam).then((response) => {
        this.inquiredStock = response.data;
        console.log(this.inquiredStock, response.data);
      });
    },
  },
};
</script>
