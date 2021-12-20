<template>
  <div class="home">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img
            src="https://media.istockphoto.com/photos/red-arrow-moving-up-over-graph-paper-background-picture-id1157569047"
            alt=""
            width="50"
            height="25"
            class="d-inline-block align-text-top"
          />
          Stock Watcher
        </a>
        <form class="d-flex">
          <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" v-model="searchStock" />
          <button class="btn btn-outline-success" type="submit" v-on:click="search">Search</button>
        </form>
      </div>
    </nav>
    <h1>{{ message }}</h1>
    <div v-if="inquiredStock.length === 0">
      <div>
        <h1>There are no results for this search. Please try again.</h1>
      </div>
    </div>
    <div v-else-if="inquiredStock[0] != 1" v-for="stock in inquiredStock" v-bind:key="stock.id">
      <!-- <h2>Stock Name: {{ stock.name }}</h2> -->
      <!-- <h2 v-on:click="getStockData(stock.symbol)">Stock Symbol: {{ stock.symbol }}</h2> -->
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ stock.name }}</h5>
              <p class="card-text">{{ stock.symbol }}</p>
              <a
                class="btn btn-danger mt-auto"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                position="center"
                v-on:click="loadData(stock)"
              >
                More Info
              </a>
            </div>
          </div>
        </div>
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
      currentStock: {},
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
      var searchParam = this.searchStock.toLowerCase();
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
    loadData: function (stock) {
      this.currentStock = stock;
      var symbol = stock.symbol;
      axios
        .get(
          "https://cloud.iexapis.com/stable/stock/" + symbol + "/chart/30d?token=pk_b600aa212c854595ba1263155ea4c39a"
        )
        .then((response) => {
          this.currentStock = response.data;
          console.log("Check for match", this.currentStock);
          this.currentStock.forEach((day) => {
            var x = (this.series[0].data.x = day.date);
            var y = (this.series[0].data.y = [day.open, day.high, day.close, day.low]);
            this.series[0].data.push({ x, y });
          });
        });
      this.loaded = true;
    },
  },
};
</script>
