import { createApp } from 'vue'
import App from './App.vue'
import AppTest from './AppTest.vue'
import './index.css'
import AppAlert from './components/AppAlert.vue'
import BaseInput from './components/BaseInput.vue'
import BaseSelect from './components/BaseSelect.vue'
import Datavue from './datavue/Datavue.vue'

const app = createApp(AppTest)
app.component('app-alert', AppAlert)
app.component('base-input', BaseInput)
app.component('base-select', BaseSelect)
app.component('data-vue',Datavue)
app.mount('#app')
