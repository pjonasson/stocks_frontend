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
        <div>
          <input type="text" placeholder="Search Stock Here" v-model="searchStock" />
          <button v-on:click="search" type="submit">Search</button>
        </div>
      </div>
    </nav>

    <h1>{{ message }}</h1>
    <div v-if="inquiredStock.length === 0">
      <div>
        <h1>There are no results for this search. Please try again.</h1>
      </div>
    </div>
    <div v-else-if="inquiredStock[0] != 1" v-for="stock in inquiredStock" v-bind:key="stock.id">
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
                v-on:click="logStock(stock)"
                href="http://localhost:8080/about"
              >
                More Info
              </a>
            </div>
          </div>
        </div>
        <div>
          <dialog id="stock-details">
            <form method="dialog">
              <h1>{{ stock.name }}</h1>
              <apexchart
                v-if="loaded"
                width="1000"
                type="candlestick"
                :options="chartOptions"
                :series="series"
              ></apexchart>

              <button>Close</button>
            </form>
          </dialog>
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
      loaded: false,
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
          data: [],
        },
      ],
      message: "Welcome to Vue.js!",
      searchStock: "",
      inquiredStock: [1],
    };
  },
  components: {},

  // async created() {
  //   const stock = await axios.get(
  //     "https://cloud.iexapis.com/stable/stock/ALGM/chart/30d?token=pk_b600aa212c854595ba1263155ea4c39a"
  //   );
  //   this.stock = stock.data;
  //   console.log("Stock Info", stock.data);
  //   this.stock.forEach((day) => {
  //     var x = (this.series[0].data.x = day.date);
  //     var y = (this.series[0].data.y = [day.open, day.high, day.low, day.close]);
  //     this.series[0].data.push({ x, y });
  //   });
  //   this.loaded = true;

  // this.loadData();
  // },
  methods: {
    search: function () {
      var searchParam = this.searchStock.toLowerCase();
      axios.get("http://localhost:3000/stocks/" + searchParam).then((response) => {
        this.inquiredStock = response.data;
        console.log("Search Results", this.inquiredStock);
        this.searchStock = "";
      });
    },
    getStockData: function (stock) {
      axios
        .get("https://cloud.iexapis.com/stable/stock/" + stock + "/chart/30d?token=pk_7320f68d3c484cf8b4eec04ead05c8cc")
        .then((response) => console.log(response.data));
    },

    loadData: function (stock) {
      this.currentStock = stock;
      var symbol = stock.symbol;
      axios
        .get(
          "https://cloud.iexapis.com/stable/stock/" + symbol + "/chart/30d?token=pk_7320f68d3c484cf8b4eec04ead05c8cc"
        )
        .then((response) => {
          this.currentStock = response.data;

          console.log("Current Stock Choice", this.currentStock);
          this.currentStock.forEach((day) => {
            var x = (this.series[0].data.x = day.date);
            var y = (this.series[0].data.y = [day.open, day.high, day.low, day.close]);
            this.series[0].data.push({ x, y });
          });
        });

      this.loaded = true;
      document.querySelector("#stock-details").showModal();

      this.series[0].data = [];
    },
    logStock: function (stock) {
      this.currentStock = stock;
      console.log("Logged Stock", this.currentStock);
      localStorage.setItem("choice", stock.symbol);
      console.log("Symbol", stock.symbol);
    },
  },
};
</script>

v-on:click="loadData(stock)"
