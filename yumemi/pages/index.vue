<template>
  <div class="container">
    <p class="heading">都道府県</p>
    <ul class="pref-list">
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
    <p class="heading">人口</p>
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
      populationAllData: [],
    }
  },
  components: {
    Chart,
  },
  async asyncData({ $axios, $config }) {
    return await $axios.$get(`${$config.apiURL}/prefectures`).then((res) => {
      return { prefs: res.result }
    })
  },
  methods: {
    drawGraph(item) {
      // APIリクエストは1度だけ
      if (
        this.populationAllData.findIndex(
          (data) => data.label === item.prefName
        ) < 0
      ) {
        const populationData = this.$axios
          .$get(
            `${this.$config.apiURL}/population/composition/perYear?prefCode=${item.prefCode}`
          )
          .then((res) => {
            const singleData = []
            const resData = res.result.data[0].data
            if (this.yearLabels.length == 0) {
              resData.forEach((val, index) => {
                this.yearLabels.push(val.year)
              })
            }
            resData.forEach((val, index) => {
              singleData.push(val.value)
            })
            this.populationAllData.push({
              label: item.prefName,
              data: singleData,
              type: 'line',
            })
            this.refreshData()
          })
      } else {
        this.refreshData()
      }
    },
    refreshData() {
      this.populationData = []
      this.checkedPrefs.sort()
      this.checkedPrefs.forEach((code, index) => {
        const targetPref = this.prefs.filter((n) => n.prefCode === code)
        const targetPrefName = targetPref[0].prefName
        this.populationData.push(
          this.populationAllData.filter((n) => n.label === targetPrefName)[0]
        )
      })
    },
  },
})
</script>

<style>
body {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 90%;
}

label {
  cursor: pointer;
}

.container {
  width: 90vw;
  margin: auto;
}

.heading {
  margin: 2rem 0 1rem;
}

.pref-list {
  display: flex;
  flex-wrap: wrap;
  max-height: 25vh;
  overflow: auto;
}

.pref-list li {
  list-style: none;
  min-width: 5rem;
  margin: 0.1rem 1rem 0.1rem 0;
}
</style>
