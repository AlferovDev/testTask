<template>
  <v-card class="survey-card mx-auto my-4" max-width="400" elevation="2">
    <v-card-title class="text-h6 font-weight-bold">
      Order #{{ props.survey.order_id }}
    </v-card-title>

    <v-card-subtitle class="pb-0">
      {{ props.survey.dateTime }}
    </v-card-subtitle>

    <v-card-text>
      <v-chip
        :color="getStatusColor(props.survey.status)"
        text-color="white"
        class="mb-4"
      >
        {{ props.survey.status }}
      </v-chip>

      <v-row dense>
        <v-col cols="6" v-if="props.survey.source">
          <v-icon color="primary" class="mr-1">mdi-source-branch</v-icon>
          {{ props.survey.source }}
        </v-col>
        <v-col cols="6">
          <v-icon color="amber" class="mr-1">mdi-star</v-icon>
          {{ props.survey.product_rating }}/5
        </v-col>
      </v-row>

      <div v-if="props.survey.comment" class="mt-3">
        <v-icon color="grey" class="mr-1">mdi-comment-text-outline</v-icon>
        {{ truncateComment(props.survey.comment) }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Survey } from "@/types/survey";

/**
 * Компонент для отображения отдельного элемента опроса
 * 
 * @component SurveyItem
 * @description Отображает информацию о конкретном опросе в виде карточки
 */

 /**
 * Пропсы компонента
 * @typedef {Object} Props
 * @property {Survey} survey - Объект с данными опроса
 */
const props = defineProps<{
  survey: Survey;
}>();

/**
 * Определяет цвет статуса опроса
 * 
 * @function getStatusColor
 * @param {string} status - Статус опроса
 * @returns {string} Цвет, соответствующий статусу
 */
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'finished':
      return 'success';
    case 'error':
      return 'error';
    default:
      return 'grey';
  }
};

/**
 * Обрезает комментарий до заданной длины
 * 
 * @function truncateComment
 * @param {string} comment - Полный текст комментария
 * @param {number} [maxLength=100] - Максимальная длина обрезанного комментария
 * @returns {string} Обрезанный комментарий
 */
const truncateComment = (comment: string, maxLength = 100) => {
  return comment.length > maxLength
    ? comment.substring(0, maxLength) + '...'
    : comment;
};
</script>

<style lang="scss" scoped>
.survey-card {
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    box-shadow: 0 0 0 2px var(--v-success-base);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::after {
    opacity: 1;
  }
}
</style>