<template>
  <div>
    <ul>
      <li v-for="(item, index) in this.prefs">
        <label>
          <input type="checkbox" :value="item.prefCode" />
          <span>{{ item.prefName }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      prefs: [],
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
})
</script>
