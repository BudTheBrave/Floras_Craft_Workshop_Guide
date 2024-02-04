

import { createApp } from 'vue'
console.log("imported vue")
import { createPinia } from 'pinia'
console.log("imported pinia")

import App from './App.vue'
import router from './router'

const app = createApp(App)
console.log("used vue")

app.use(createPinia())

console.log("used pinia")
app.use(router)

app.mount('#app')
