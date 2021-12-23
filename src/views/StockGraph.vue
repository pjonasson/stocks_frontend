<template>
  <div class="about">
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
      </div>
    </nav>
    <div class="body">
      <h1>{{ stockName }}</h1>
      <div class="row">
        <div class="column left">
          <iframe
            v-if="stockOpens[0] < stockCloses[stockCloses.length - 1]"
            src="https://giphy.com/embed/AgHBbekqDik0g"
            width="90%"
            height="269"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
          <iframe
            v-else-if="stockOpens[0] > stockCloses[stockCloses.length - 1]"
            src="https://giphy.com/embed/S3n6idriKtiFbZyqve"
            width="90%"
            height="269"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
          <h2>{{ symbol }}</h2>
          <p>30 Day High: ${{ stockHigh[0] }}</p>
          <p>30 Day Low: ${{ stockLow[0] }}</p>
          <p>30 Day Average Open: ${{ stockAverageOpen[0] }}</p>
          <p>30 Day Average Close: ${{ stockAverageClose[0] }}</p>
        </div>
        <div class="column right">
          <apexchart v-if="loaded" width="95%" type="candlestick" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
    </div>
    <div onclick="location.href='http://localhost:8080';" style="cursor: pointer" id="arrowAnim">
      <h1 style="color: red">Go back</h1>

      <div class="arrowSliding">
        <div class="arrow"></div>
      </div>
      <div class="arrowSliding delay1">
        <div class="arrow"></div>
      </div>
      <div class="arrowSliding delay2">
        <div class="arrow"></div>
      </div>
      <div class="arrowSliding delay3">
        <div class="arrow"></div>
      </div>
    </div>
  </div>
</template>

<style>
.body {
  text-align: center;
}
.container {
  justify-content: center;
}
.column {
  float: left;
  padding: 10px;
  height: 300px;
}

.left {
  width: 25%;
}

.right {
  width: 75%;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}
#arrowAnim {
  padding-left: 50px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0px;
}

.arrow {
  width: 2vw;
  height: 2vw;
  border: 0.5vw solid;
  border-color: black transparent transparent black;
  transform: rotate(-45deg);
}

.arrowSliding {
  position: absolute;
  -webkit-animation: slide 4s linear infinite;
  animation: slide 4s linear infinite;
}

.delay1 {
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}
.delay2 {
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
}
.delay3 {
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
}

@-webkit-keyframes slide {
  0% {
    opacity: 0;
    transform: translateX(15vw);
  }
  20% {
    opacity: 1;
    transform: translateX(9vw);
  }
  80% {
    opacity: 1;
    transform: translateX(-9vw);
  }
  100% {
    opacity: 0;
    transform: translateX(-15vw);
  }
}
@keyframes slide {
  0% {
    opacity: 0;
    transform: translateX(15vw);
  }
  20% {
    opacity: 1;
    transform: translateX(9vw);
  }
  80% {
    opacity: 1;
    transform: translateX(-9vw);
  }
  100% {
    opacity: 0;
    transform: translateX(-15vw);
  }
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      stockHigh: [],
      stockLow: [],
      stockCloses: [],
      stockAverageClose: [],
      stockOpens: [],
      stockAverageOpen: [],
      symbol: localStorage.getItem("choice"),
      stockName: localStorage.getItem("name"),

      stockData: {},
      loaded: false,
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
    };
  },
  components: {},

  async created() {
    const stock = await axios.get(
      "https://cloud.iexapis.com/stable/stock/" + this.symbol + "/chart/30d?token=pk_7320f68d3c484cf8b4eec04ead05c8cc"
    );
    this.stock = stock.data;
    console.log("Stock Info", stock.data);
    this.stock.forEach((day) => {
      var x = (this.series[0].data.x = day.date);
      var y = (this.series[0].data.y = [day.open, day.high, day.low, day.close]);
      this.series[0].data.push({ x, y });
    });
    this.loaded = true;
    this.high();
  },
  methods: {
    high: function () {
      var stockHigh = this.stock[0].high;
      var stockLow = this.stock[0].low;
      this.stock.forEach((day) => {
        this.stockCloses.push(day.close);
        this.stockOpens.push(day.open);

        if (day.high > stockHigh) {
          stockHigh = day.high;
        }
        if (day.low < stockLow) {
          stockLow = day.low;
        }
      });
      console.log("Stock test", stockHigh, stockLow);
      this.stockHigh.push(stockHigh);
      this.stockLow.push(stockLow);
      var sumClose = 0;
      this.stockCloses.forEach((day) => {
        sumClose += day;
      });
      this.stockAverageClose.push((sumClose / this.stockCloses.length).toFixed(2));
      var sumOpen = 0;
      this.stockOpens.forEach((day) => {
        sumOpen += day;
      });
      this.stockAverageOpen.push((sumOpen / this.stockOpens.length).toFixed(2));
    },
  },
};
</script>
