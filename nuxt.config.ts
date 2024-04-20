// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      API_KEY: process.env.API_KEY,
    }    
  },
  app: {

    head: {
      link: [{
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css'
        },
      ],
      script: [{
          src: "https://code.jquery.com/jquery-3.6.0.min.js",
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js'
        }
      ],
    },
  },
  css: ['~/assets/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
