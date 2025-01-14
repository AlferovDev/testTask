import axios from 'axios'

/**
 * @module api
 * @description Модуль для создания и экспорта настроенного экземпляра Axios
 */

/**
 * Создание настроенного экземпляра Axios
 * @constant {AxiosInstance}
 * @description Экземпляр Axios с предустановленным базовым URL для API
 */
const api = axios.create({
  baseURL: 'https://bot.artis21.ru/api'
})

/**
 * Экспорт настроенного экземпляра Axios
 * @exports {AxiosInstance}
 */
export default api