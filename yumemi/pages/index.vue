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
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      prefs: [],
      checkedPrefs: [],
    }
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
          console.log(res.result.data[0].data)
          for (let i = 0; i < res.result.data[0].data.length - 1; i++) {
            console.log(res.result.data[0].data[i].value)
          }
        })
    },
  },
})
</script>
