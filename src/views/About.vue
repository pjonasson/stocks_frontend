<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <apexchart width="1000" type="candlestick" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      symbol: localStorage.getItem("symbol"),

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
          data: [
            {
              x: new Date(1538778600000),
              y: [6629.81, 6650.5, 6623.04, 6633.33],
            },
            {
              x: new Date(1538780400000),
              y: [6632.01, 6643.59, 6620, 6630.11],
            },
            {
              x: new Date(1538782200000),
              y: [6630.71, 6648.95, 6623.34, 6635.65],
            },
            {
              x: new Date(1538784000000),
              y: [6635.65, 6651, 6629.67, 6638.24],
            },
            {
              x: new Date(1538785800000),
              y: [6638.24, 6640, 6620, 6624.47],
            },
          ],
        },
      ],
    };
  },
  components: {},

  // async created() {
  //   const stock = await axios.get(
  //     "https://cloud.iexapis.com/stable/stock/FB/chart/30d?token=pk_b600aa212c854595ba1263155ea4c39a"
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
