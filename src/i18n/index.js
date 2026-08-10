import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import id from './locales/id.json'
import ru from './locales/ru.json'

const savedLocale = localStorage.getItem('locale')
const initialLocale = ['en', 'id', 'ru'].includes(savedLocale) ? savedLocale : 'en'

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages: { en, id, ru },
})

export default i18n
