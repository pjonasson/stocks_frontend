<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <apexchart v-if="loaded" width="1000" type="candlestick" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      symbol: localStorage.getItem("choice"),

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
  },
  methods: {},
};
</script>
