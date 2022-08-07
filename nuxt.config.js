export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'leyuna-blog-ssr',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'},
    ]
  },
  server: {
    host: 'localhost',
    port: 80,
    open: true,
    strictPort: false,
    https: false,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'assets/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/markdown'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  axios: {
    proxy: true,
    prefix: '/leyuna'
  },
  proxy: {
    '/leyuna': {
      target: 'http://127.0.0.1:9000',//要代理的后端地址
    },
    '/disk': {
      target: 'http://127.0.0.1:9001',
      changeOrigin: true,
      secure: false
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: [/^element-ui/],
  }
}
