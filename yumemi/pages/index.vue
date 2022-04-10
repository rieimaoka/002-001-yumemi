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
            @change="changePrefCheckbox(item)"
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
    //  RESAS(地域経済分析システム) APIの「都道府県一覧」からAPIを取得する
    return await $axios.$get(`${$config.apiURL}/prefectures`).then((res) => {
      return { prefs: res.result }
    })
  },
  methods: {
    //
    changePrefCheckbox(item) {
      // 都道府県にチェックを入れると、RESAS APIから選択された都道府県の「人口構成」を取得する
      // data = {
      //  labels: this.yearLabels,
      //  datasets: this.chartPopulationData,
      // }
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
            // 横軸のラベルを設置する(初めてチェックボックスをチェックした時だけ)
            if (this.yearLabels.length == 0) {
              resData.forEach((val, index) => {
                this.yearLabels.push(val.year)
              })
            }
            // 都道府県のデータを詰める
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
      // 人口構成APIレスポンスから、X軸:年、Y軸:人口数の折れ線グラフを動的に生成して表示する
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
