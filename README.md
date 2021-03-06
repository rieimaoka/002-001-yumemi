# 都道府県別の総人口推移グラフを表示する SPA

## 開発環境について

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## デプロイについて

firebase にホスティングしています。

```bash
## local emulator test
firebase emulators:start;

## deploy
firebase deploy --only hosting

```

## 使用しているライブラリ

- nuxt

### JavaScript ライブラリ

- eslint
- prettier
- [chart.js](https://www.chartjs.org/)
  - [vue-chartjs](https://vue-chartjs.org/)
  - [chartjs-plugin-colorschemes](https://nagix.github.io/chartjs-plugin-colorschemes/ja/)

### CSS に関するライブラリ

- stylelint
  - stylelint-config-prettier
  - stylelint-config-recommend-vue
  - stylelint-config-standard
- postcss
- ress

## API

- [RESAS API](https://opendata.resas-portal.go.jp/)
