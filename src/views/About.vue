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
      "https://cloud.iexapis.com/stable/stock/FB/chart/30d?token=pk_b600aa212c854595ba1263155ea4c39a"
    );
    this.stock = stock.data;
    console.log("Stock Info", stock.data);
    this.stock.forEach((day) => {
      var x = (this.series[0].data.x = day.date);
      var y = (this.series[0].data.y = [day.open, day.high, day.low, day.close]);
      this.series[0].data.push({ x, y });
    });
    this.loaded = true;

    // this.loadData();
  },
  methods: {
    loadData: function () {
      axios
        .get("https://cloud.iexapis.com/stable/stock/FB/chart/30d?token=pk_b600aa212c854595ba1263155ea4c39a")
        .then((response) => {
          this.stock = response.data;
          console.log("Facebook", this.stock);
          this.stock.forEach((day) => {
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

this.stock.forEach((day) => this.series[0].data.push({ x: day.date, y: [day.open, day.high, day.close, day.low] }) );
console.log("Data for series", this.series[0].data);
