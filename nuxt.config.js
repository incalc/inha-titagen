import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Inha Timetable',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/style/app.styl'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/vuetify'],

  router: {
    base: '/inha-timetable-generator/'
  },

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/pwa'],

  manifest: {
    name: 'Inha Timetable',
    short_name: 'Inha Timetable',
    scope: '/inha-timetable-generator/',
    start_url: '/inha-timetable-generator/?utm_source=homescreen',
    display: 'standalone',
    background_color: '#005bac',
    theme_color: '#005bac',
    description: 'Inha Univ. Timetable Generator',
    icons: [
      {
        src: '/inha-timetable-generator/touch/icon48.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: '/inha-timetable-generator/touch/icon72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: '/inha-timetable-generator/touch/icon96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: '/inha-timetable-generator/touch/icon144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: '/inha-timetable-generator/touch/icon168.png',
        sizes: '168x168',
        type: 'image/png'
      },
      {
        src: '/inha-timetable-generator/touch/icon192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/inha-timetable-generator/touch/icon512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
  },

  /*
  ** Build configuration
  */
  build: {
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
