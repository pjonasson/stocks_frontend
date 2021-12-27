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
    <div class="body">
      <div>
        <h1 style="font-family: 'Copperplate'">30 Day Nasdaq Stock Watcher</h1>
      </div>
      <img
        src="https://media.istockphoto.com/photos/financial-graph-and-technology-element-on-mobile-phone-3d-rendering-picture-id1283432364?b=1&k=20&m=1283432364&s=170667a&w=0&h=fOrWHOUqwbuoK9laIO6CnaTs8C3FAZcT_igWZ80Eksk="
        alt=""
        width="90%"
        height="700"
      />
      <div v-if="inquiredStock.length === 0">
        <div>
          <h1>There are no results for this search. Please try again.</h1>
        </div>
      </div>
      <div class="row" v-else-if="inquiredStock[0] != 1">
        <div class="col-md-3 col-sm-2 m-2" v-for="stock in inquiredStock" v-bind:key="stock.id">
          <div class="card" style="height: 100%">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ stock.name }}</h5>
              <p class="card-text">{{ stock.symbol }}</p>
              <a
                class="btn btn-success mt-auto"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                position="center"
                v-on:click="logStock(stock)"
                href="https://jolly-pasteur-0b7968.netlify.app/stock_graph"
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

<style>
.body {
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 15px;
  text-align: center;
}
.row {
  justify-content: center;
  padding-top: 40px;
}
</style>

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
      searchStock: "",
      inquiredStock: [1],
    };
  },
  components: {},

  methods: {
    search: function () {
      var searchParam = this.searchStock.toLowerCase();
      axios.get("https://pacific-fjord-09245.herokuapp.com/stocks" + searchParam).then((response) => {
        this.inquiredStock = response.data;
        console.log("Search Results", this.inquiredStock);
        this.searchStock = "";
      });
    },
    logStock: function (stock) {
      this.currentStock = stock;
      console.log("Logged Stock", this.currentStock);
      localStorage.setItem("choice", stock.symbol);
      localStorage.setItem("name", stock.name);

      console.log("Symbol", stock.symbol);
    },
  },
};
</script>
