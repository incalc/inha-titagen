import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Inha TitaGen',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
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

  router: {
    base: '/inha-titagen/'
  },

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/pwa'],

  manifest: {
    name: 'Inha TitaGen',
    short_name: 'Inha TitaGen',
    scope: '/inha-titagen/',
    start_url: '/inha-titagen/?utm_source=homescreen',
    display: 'standalone',
    background_color: '#005bac',
    theme_color: '#005bac',
    description: 'Inha Univ. Timetable Generator',
    icons: [
      {
        src: '/inha-titagen/touch/icon48.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: '/inha-titagen/touch/icon72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: '/inha-titagen/touch/icon96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: '/inha-titagen/touch/icon144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: '/inha-titagen/touch/icon168.png',
        sizes: '168x168',
        type: 'image/png'
      },
      {
        src: '/inha-titagen/touch/icon192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/inha-titagen/touch/icon512.png',
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
