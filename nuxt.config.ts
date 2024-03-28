// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  head: {
    link: [{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css' }],
    script: [{
      src: "https://code.jquery.com/jquery-3.6.0.min.js",
    },     
    {
      src: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js'
    }
  ],
  },
  css: ['~/assets/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
