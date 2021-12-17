<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>{{ series[0].data }}</h3>
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
              x: "2021-11-17",
              y: [6629.81, 6650.5, 6623.04, 6633.33],
            },
          ],
        },
      ],
    };
  },
  components: {},

  created: function () {
    this.loadData();
  },
  methods: {
    loadData: function () {
      this.loaded = true;

      axios
        .get("https://cloud.iexapis.com/stable/stock/FB/chart/30d?token=pk_b600aa212c854595ba1263155ea4c39a")
        .then((response) => {
          this.stock = response.data;
          console.log("Facebook", this.stock);
          this.stock.forEach((day) =>
            this.series[0].data.push({ x: day.date, y: [day.open, day.high, day.close, day.low] })
          );
          console.log("Data for series", this.series[0].data);
        });
    },
  },
};
</script>

this.series[this.data].push()
