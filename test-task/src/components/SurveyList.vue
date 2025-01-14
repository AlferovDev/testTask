
<template>
  <v-container>
    <v-row v-if="isLoading" justify="center" align="center" class="fill-height">
      <v-col cols="auto">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
      </v-col>
    </v-row>

    <template v-else>
      <v-virtual-scroll
        v-if="surveys.length"
        :items="groupedSurveys"
        height="70vh"
        item-height="250"
      >
        <template v-slot:default="{ item }">
            <v-row>
              <v-col v-for="survey in item" :key="survey.id" cols="12" sm="6" md="4">
                <SurveyItem :survey="survey" />
              </v-col>
            </v-row>
        </template>
      </v-virtual-scroll>

      <v-row v-else justify="center" class="mt-8">
        <v-col cols="auto">
          <v-alert type="info" text="Опросы не найдены" />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SurveyItem from '@/components/SurveyItem.vue';
import type { Survey } from "@/types/survey";

/**
 * Компонент для отображения списка опросов
 * 
 * @component SurveyList
 * @description Отображает список опросов с возможностью виртуального скроллинга.
 *              Показывает индикатор загрузки, если данные еще загружаются.
 *              Если опросов нет, показывает соответствующее сообщение.
 */

 /**
 * Интерфейс пропсов компонента
 * @typedef {Object} Props
 * @property {Survey[]} surveys - Массив объектов опросов для отображения
 * @property {boolean} isLoading - Флаг, указывающий на процесс загрузки данных
 */
interface Props {
  surveys: Survey[];
  isLoading: boolean;
}

/**
 * Пропсы компонента с значениями по умолчанию
 */
const props = withDefaults(defineProps<Props>(), {
  surveys: () => [],
  isLoading: false,
});

/**
 * Вычисляемое свойство для группировки опросов
 * 
 * @computed groupedSurveys
 * @returns {Array<Survey[]>} Массив групп опросов, где каждая группа содержит до трех опросов
 */
const groupedSurveys = computed(() => {
  const grouped = [];
  for (let i = 0; i < props.surveys.length; i += 3) {
    grouped.push(props.surveys.slice(i, i + 3));
  }
  return grouped;
});
</script>

<style lang="scss" scoped>
.fill-height {
  height: 50vh;
}
</style>