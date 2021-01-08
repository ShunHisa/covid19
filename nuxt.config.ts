import { Configuration } from '@nuxt/types'
import { Configuration as WebpackConfiguration } from 'webpack'
import i18n from './nuxt-i18n.config'
const webpack = require('webpack')
const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')
const environment = process.env.NODE_ENV || 'development'

const config: Configuration = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: '%s | 北九州市 新型コロナウイルス感染症情報サイト',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          '当サイトは新型コロナウイルス感染症（COVID-19）に関する最新情報を提供するために、北九州市のオープンデータを活用しています。'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: '北九州市 新型コロナウイルス感染症ポータルサイト'
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://stopcovid19-kitakyushu.jp/'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: '北九州市 新型コロナウイルス感染症ポータルサイト'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '当サイトは新型コロナウイルス感染症（COVID-19）に関する最新情報を提供するために、北九州市のオープンデータを活用しています。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://stopcovid19-kitakyushu.jp/ogp.png'
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@city_kitakyushu'
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@city_kitakyushu'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://stopcovid19-kitakyushu.jp/ogp.png'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon-precomposed.png' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~assets/global.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '@/plugins/vue-chart.ts',
      ssr: true
    },
    {
      src: '@/plugins/axe',
      ssr: true
    },
    {
      src: '@/plugins/vuetify.ts',
      ssr: true
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build',
    '@nuxtjs/google-analytics'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv', { filename: `.env.${environment}` }],
    ['nuxt-i18n', i18n],
    'nuxt-svg-loader',
    'nuxt-purgecss',
    ['vue-scrollto/nuxt', { duration: 1000, offset: -72 }]
  ],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      icons: false
    }
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID // .env.production などに設定してください。
  },
  optionalCookies: [
    {
      name: 'i18n_redirected',
      label: 'i18n Redirection Cookie',
      description:
        'For automatically switching UI languages in accordance with locale preferences in the web browser configuration.',
      cookies: ['i18n_redirected']
    }
  ],
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: 'mapbox-gl'
      })
    ],
    postcss: {
      plugins: [
        autoprefixer({ grid: 'autoplace' }),
        purgecss({
          content: [
            './pages/**/*.vue',
            './layouts/**/*.vue',
            './components/**/*.vue',
            './node_modules/vuetify/dist/vuetify.js',
            './node_modules/vue-spinner/src/ScaleLoader.vue'
          ],
          whitelist: ['html', 'body', 'nuxt-progress', 'DataCard'],
          whitelistPatterns: [/(col|row)/]
        })
      ]
    },
    extend(config: WebpackConfiguration, _) {
      // default externals option is undefined
      config.externals = [{ moment: 'moment' }]
    }
    // https://ja.nuxtjs.org/api/configuration-build/#hardsource
    // hardSource: process.env.NODE_ENV === 'development'
  },
  manifest: {
    name: '北九州市 新型コロナウイルス感染症情報サイト',
    theme_color: '#24448c',
    background_color: '#ffffff',
    display: 'standalone',
    Scope: '/',
    start_url: '/',
    splash_pages: null
  },
  generate: {
    fallback: true,
    routes() {
      const locales = ['ja']
      const pages = [
        '/cards/details-of-confirmed-cases',
        '/cards/details-of-tested-cases',
        '/cards/number-of-confirmed-cases',
        '/cards/attributes-of-confirmed-cases',
        '/cards/number-of-tested',
        '/cards/number-of-inspection-persons',
        '/cards/number-of-reports-to-covid19-telephone-advisory-center',
        '/cards/number-of-tested-breakdown'
      ]

      const routes: string[] = []
      locales.forEach(locale => {
        pages.forEach(page => {
          if (locale === 'ja') {
            routes.push(page)
            return
          }
          const route = `/${locale}${page}`
          routes.push(route)
        })
      })
      return routes
    }
  },
  // /*
  // ** hot read configuration for docker
  // */
  watchers: {
    webpack: {
      poll: true
    }
  }
}

export default config
