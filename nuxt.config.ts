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
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/icon.png'
        },        
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css'
        },
      ],
      script: [{
          src: "https://code.jquery.com/jquery-3.6.0.min.js",
        },       
      ],
    },
  },
  css: ['~/assets/main.css'],
  modules: [
    'vue3-carousel-nuxt'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
