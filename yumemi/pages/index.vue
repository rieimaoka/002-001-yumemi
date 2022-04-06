<template>
  <div>
    <ul>
      <li v-for="(item, index) in this.prefs">
        <label :for="`pref-${item.prefCode}`">
          <input
            :id="`pref-${item.prefCode}`"
            type="checkbox"
            :value="item.prefCode"
            v-model="checkedPrefs"
            @change="drawGraph(item)"
          />
          <span>{{ item.prefName }}</span>
        </label>
      </li>
    </ul>
    <p>{{ checkedPrefs }}</p>
    <chart
      :chartLabels="yearLabels"
      :chartPopulationData="populationData"
    ></chart>
  </div>
</template>

<script>
import Vue from 'vue'
import Chart from '../components/Chart'

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      prefs: [],
      checkedPrefs: [],
      yearLabels: [],
      populationData: [],
    }
  },
  components: {
    Chart,
  },
  async asyncData({ $axios, $config }) {
    return await $axios
      .$get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: {
          'X-API-KEY': $config.apiKey,
        },
      })
      .then((res) => {
        return { prefs: res.result }
      })
  },
  methods: {
    drawGraph(item) {
      const populationData = this.$axios
        .$get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${item.prefCode}`,
          {
            headers: {
              'X-API-KEY': this.$config.apiKey,
            },
          }
        )
        .then((res) => {
          const singleData = []
          if (this.yearLabels.length == 0) {
            for (let i = 0; i < res.result.data[0].data.length - 1; i++) {
              this.yearLabels.push(res.result.data[0].data[i].year)
            }
          }
          for (let i = 0; i < res.result.data[0].data.length - 1; i++) {
            singleData.push(res.result.data[0].data[i].value)
          }
          this.populationData.push({
            label: item.prefName,
            data: singleData,
            type: 'line',
          })
        })
    },
  },
})
</script>
