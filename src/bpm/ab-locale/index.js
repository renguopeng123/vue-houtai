import Vue from 'vue'
import VueI18n from 'vue-i18n'
import customZhCn from './lang/zh-CN'
import customZhTw from './lang/zh-TW'
import customEnUs from './lang/en-US'
import zhCnLocale from 'iview/src/locale/lang/zh-CN'
import enUsLocale from 'iview/src/locale/lang/en-US'
import zhTwLocale from 'iview/src/locale/lang/zh-TW'

Vue.use(VueI18n)

let lang = 'zh-CN'

Vue.config.lang = lang

// vue-i18n 6.x+写法
Vue.locale = () => {}
const messages = {
    'zh-CN': Object.assign(zhCnLocale, customZhCn),
    'zh-TW': Object.assign(zhTwLocale, customZhTw),
    'en-US': Object.assign(enUsLocale, customEnUs)
}
const i18n = new VueI18n({
    locale: lang,
    messages
})

export default i18n