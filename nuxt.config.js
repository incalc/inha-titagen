import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'

const NAME = 'Inha TitaGen'
const DESCRIPTION = 'Inha Univ. Timetable Generator'
const BASE_URL = '/inha-titagen/';

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: DESCRIPTION }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl',
    '~/assets/fonts.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/vuetify'],

  router: { base: BASE_URL },

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/pwa'],

  manifest: {
    name: NAME,
    short_name: NAME,
    description: DESCRIPTION,
    scope: BASE_URL,
    display: 'standalone',
    start_url: '/inha-titagen/?utm_source=homescreen',
    theme_color: '#005bac',
    background_color: '#005bac'
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  generate: {
    dir: 'docs'
  }
}
