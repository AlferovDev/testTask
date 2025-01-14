/**
 * Представляет структуру данных опроса.
 */
export interface Survey {
  /** Уникальный идентификатор опроса */
  id: number
  /** Идентификатор заказа */
  order_id: string
  /** Источник опроса */
  source: string
  /** Показатель рекламации (0 или 1) */
  reclamation: number
  /** Оценка продукта (от 1 до 5) */
  product_rating: number
  /** Оценка консультанта */
  consultant_rating: string
  /** Оценка диспетчера */
  dispatcher_rating: string
  /** Оценка сборщиков */
  assemblers_rating: string
  /** Оценка рекомендации */
  recommend_rating: number
  /** Комментарий к опросу */
  comment: string
  /** Статус опроса */
  status: string
  /** Дата и время проведения опроса */
  dateTime: string
}

/**
 * Представляет структуру сообщения о статусе операции.
 */
export interface StatusMessage {
  /** Текст сообщения */
  message: string
  /** Тип сообщения (ошибка или успех) */
  type?: 'error' | 'success'
}

/**
 * Представляет структуру ответа API.
 */
export interface ApiResponse {
  /** Флаг успешности операции */
  success: boolean
  /** Массив данных опросов (присутствует только при успешной операции) */
  data?: Survey[]
  /** Информация об ошибке (присутствует только при неуспешной операции) */
  error?: StatusMessage
}