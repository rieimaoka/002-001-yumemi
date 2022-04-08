<script>
import { Bar, mixins } from 'vue-chartjs'
import { brewer } from 'chartjs-plugin-colorschemes'

export default {
  extends: Bar,
  name: 'chart',
  mixins: [mixins.reactiveData],
  props: ['chartLabels', 'chartPopulationData'],
  data() {
    return {
      options: {
        plugin: {
          colorschemes: {
            scheme: 'brewer.Paired3',
          },
        },
      },
    }
  },
  methods: {
    render() {
      let data = {
        labels: this.chartLabels,
        datasets: this.chartPopulationData,
      }
      this.renderChart(data, this.options)
    },
  },
  mounted() {
    this.render()
  },
  watch: {
    chartLabels() {
      this.render()
    },
    chartPopulationData() {
      this.render()
    },
  },
}
</script>
