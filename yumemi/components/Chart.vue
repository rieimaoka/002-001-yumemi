<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  name: 'chart',
  data() {
    return {
      data: {
        labels: [
          '1960',
          '1965',
          '1970',
          '1975',
          '1980',
          '1985',
          '1990',
          '1995',
          '2000',
          '2005',
          '2010',
          '2015',
          '2020',
          '2025',
          '2030',
          '2035',
        ],
        datasets: [
          {
            label: '総人口',
            data: [
              1981433, 1958007, 1956917, 2017564, 2083934, 2136927, 2156627,
              2193984, 2215168, 2196114, 2152449, 2098804, 2033235, 1957953,
              1877667, 1793174, 1704857,
            ],
            borderColor: '#CFD8DC',
            fill: false,
            type: 'line',
            lineTension: 0.3,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: '年',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1000000,
              },
            },
          ],
        },
      },
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
}
</script>
