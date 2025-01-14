<template>
  <v-container class="survey-page">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="88">
        <v-card class="mb-6" elevation="2">
          <v-card-title class="text-h4 font-weight-bold pa-4">
            <v-icon large left color="primary" class="mr-2">mdi-poll</v-icon>
            Опросы за период
          </v-card-title>
          <v-card-text>
            <SurveyForm @submit="handleDateSubmit" />
          </v-card-text>
        </v-card>

        <v-fade-transition>
          <v-alert
            v-if="error"
            type="error"
            class="mb-6"
            closable
            @click:close="error = null"
          >
            {{ error }}
          </v-alert>
        </v-fade-transition>

        <v-card
          v-if="surveys.length || isLoading"
          class="survey-results"
          elevation="2"
        >
          <v-card-title class="text-h5 font-weight-medium">
            Результаты опросов
          </v-card-title>
          <v-card-text>
            <SurveyList :surveys="surveys" :isLoading="isLoading" />
          </v-card-text>
        </v-card>

        <v-fade-transition>
          <v-card
            v-if="!isLoading && surveys.length === 0 && !error"
            class="mt-6"
            elevation="2"
          >
            <v-card-text class="text-center">
              <v-icon x-large color="grey lighten-1"
                >mdi-clipboard-text-outline</v-icon
              >
              <p class="text-h6 mt-2">
                Выберите диапазон дат для просмотра опросов
              </p>
            </v-card-text>
          </v-card>
        </v-fade-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Survey } from "@/types/survey";
import SurveyForm from "@/components/SurveyForm.vue";
import SurveyList from "@/components/SurveyList.vue";
import { fetchSurveys } from "@/services/useSurveys";

/**
 * @component SurveyPage
 * @description Главная страница для отображения и управления опросами.
 *              Позволяет пользователю выбрать диапазон дат и отображает соответствующие опросы.
 */

/**
 * @constant {Ref<Survey[]>} surveys
 * @description Реактивный массив для хранения загруженных опросов
 */
const surveys = ref<Survey[]>([]);

/**
 * @constant {Ref<boolean>} isLoading
 * @description Реактивная переменная для отслеживания состояния загрузки
 */
const isLoading = ref(false);

/**
 * @constant {Ref<string | null>} error
 * @description Реактивная переменная для хранения сообщений об ошибках
 */
const error = ref<string | null>(null);

/**
 * @function handleDateSubmit
 * @description Обрабатывает отправку формы с выбранным диапазоном дат
 * @param {string} fromDate - Начальная дата диапазона
 * @param {string} toDate - Конечная дата диапазона
 */
const handleDateSubmit = async (fromDate: string, toDate: string) => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await fetchSurveys(fromDate, toDate);
    if (response.success && response.data) {
      surveys.value = response.data;
    } else {
      error.value =
        response.error?.message || "Произошла ошибка при загрузке опросов.";
    }
  } catch (e) {
    error.value =
      "Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.survey-page {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.survey-results {
  width: 100%;
}
</style>
