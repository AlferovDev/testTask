import api from '@/boot/api'
import type { Survey, ApiResponse, StatusMessage } from '@/types/survey'
import { AxiosError } from 'axios'

/**
 * Получает список опросов за указанный период.
 * 
 * @param {string} from - Начальная дата периода в формате, ожидаемом API.
 * @param {string} to - Конечная дата периода в формате, ожидаемом API.
 * @returns {Promise<ApiResponse>} Объект с результатом запроса.
 *   В случае успеха, возвращает { success: true, data: Survey[] }.
 *   В случае ошибки, возвращает { success: false, error: StatusMessage }.
 * 
 * @throws {Error} Если произошла неожиданная ошибка при выполнении запроса.
 * 
 * @example
 * const result = await fetchSurveys('2023-01-01', '2023-12-31');
 * if (result.success) {
 *   console.log('Получены опросы:', result.data);
 * } else {
 *   console.error('Ошибка:', result.error.message);
 * }
 */

export const fetchSurveys = async (from: string, to: string): Promise<ApiResponse> => {
  if (!from || !to) {
    return {
      success: false,
      error: {
        message: 'Необходимо указать обе даты (начальную и конечную).',
        type: 'error',
      }
    };
  }
  try {
    const response = await api.get<Survey[]>('/get_surveys.php', {
      params: {
        from_date: from,
        to_date: to
      }
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    let errorMessage: StatusMessage = {
      message: 'Неизвестная ошибка.',
      type: 'error'
    };

    if (error instanceof Error) {
      if ('response' in error && error.response) {
        const axiosError = error as AxiosError<{ message: StatusMessage }>;
        if (axiosError.response?.status === 404) {
          errorMessage.message = 'Не найдено совпадений за выбранный период.';
        } else if (axiosError.response?.status === 400) {
          errorMessage.message = 'Неверный формат даты. Введите дату в верном формате.';
        } else if (axiosError.response?.data && axiosError.response?.data.message) {
          errorMessage = axiosError.response?.data.message;
        }

      } else {
        errorMessage.message = error.message;
      }
    }

    return {
      success: false,
      error: errorMessage
    };
  }
}