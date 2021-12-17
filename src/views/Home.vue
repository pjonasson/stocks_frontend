<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div>
      <apexchart width="500" type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
    <input type="text" v-model="searchStock" />
    <button v-on:click="search">Search for Stock</button>
    <div v-if="inquiredStock.length === 0">
      <div>
        <h1>There are no results for this search. Please try again.</h1>
      </div>
    </div>
    <div v-else-if="inquiredStock[0] != 1" v-for="stock in inquiredStock" v-bind:key="stock.id">
      <h2>Stock Name: {{ stock.name }}</h2>
      <h2 v-on:click="getStockData(stock.symbol)">Stock Symbol: {{ stock.symbol }}</h2>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
      message: "Welcome to Vue.js!",
      searchStock: "",
      inquiredStock: [1],
    };
  },
  components: {},

  created: function () {},
  methods: {
    search: function () {
      var searchParam = this.searchStock;
      axios.get("http://localhost:3000/stocks/" + searchParam).then((response) => {
        this.inquiredStock = response.data;
        console.log(this.inquiredStock, response.data);
        this.searchStock = "";
      });
    },
    getStockData: function (stock) {
      axios
        .get("https://cloud.iexapis.com/stable/stock/" + stock + "/chart/30d?token=pk_b600aa212c854595ba1263155ea4c39a")
        .then((response) => console.log(response.data));
    },
  },
};
</script>

message: "Welcome to Vue.js!", searchStock: "", inquiredStock: [1], series: [],
