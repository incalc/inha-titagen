const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const NAME = 'Inha TitaGen'
const DESCRIPTION = 'Inha Univ. Timetable Generator'
const BASE_URL = '/inha-titagen/';
const THEME_COLOR = '#005bac';

module.exports = {
  css: [
    '~/assets/style/app.styl',
    '~/assets/fonts.css'
  ],

  loading: { color: THEME_COLOR },

  plugins: ['@/plugins/vuetify'],

  modules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa'
  ],

  googleAnalytics: { id: 'UA-140031790-1' },

  manifest: {
    name: NAME,
    short_name: NAME,
    description: DESCRIPTION,
    scope: BASE_URL,
    display: 'standalone',
    start_url: `${BASE_URL}?utm_source=homescreen`,
    theme_color: THEME_COLOR,
    background_color: THEME_COLOR
  },

  meta: {
    name: NAME,
    description: DESCRIPTION,
    appleStatusBarStyle: 'black-translucent',
    ogHost: `https://astro36.github.io${BASE_URL}`,
    ogImage: 'social_preview.png'
  },

  mode: 'universal',

  router: { base: BASE_URL },

  build: {
    extractCSS: true,
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    plugins: [new VuetifyLoaderPlugin()],
    transpile: ['vuetify/lib']
  }
}
