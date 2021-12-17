<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div>
      <apexchart width="1000" type="candlestick" :options="chartOptions" :series="series"></apexchart>
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
          datetimeFormatter: {},
        },
      },
      series: [
        {
          name: "series-1",
          data: [
            {
              x: "2021 - 11 - 17",
              y: [6629.81, 6650.5, 6623.04, 6633.33],
            },
            {
              x: "2021-11-18",
              y: [6632.01, 6643.59, 6620, 6630.11],
            },
            {
              x: "2021-11-19",
              y: [6630.71, 6648.95, 6623.34, 6635.65],
            },
            {
              x: "2021-11-20",
              y: [6635.65, 6651, 6629.67, 6638.24],
            },
            {
              x: "2021-11-21",
              y: [6638.24, 6640, 6620, 6624.47],
            },
            {
              x: "2021-11-22",
              y: [6624.53, 6636.03, 6621.68, 6624.31],
            },
          ],
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
