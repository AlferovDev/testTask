<template>
  <v-card class="mx-auto pa-6" max-width="400" elevation="3">
    <v-card-title class="text-h5 mb-4">Диапазон дат опроса</v-card-title>
    <v-form @submit.prevent="submitForm">
      <v-row dense>
        <v-col cols="12">
          <DateInput
            v-model="fromDate"
            label="Начальная дата"
            required
            :max="toDate"
          />
        </v-col>
        <v-col cols="12">
          <DateInput
            v-model="toDate"
            label="Конечная дата"
            required
            :min="fromDate"
          />
        </v-col>
      </v-row>
      <v-card-actions class="pa-0 mt-4 justify-center">
        <Button label="Отправить" color="primary" @click="submitForm" />
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/Button.vue";
import DateInput from "@/components/DateInput.vue";

/**
 * Компонент формы выбора диапазона дат опроса
 * 
 * @component SurveyForm
 * @description Форма для выбора начальной и конечной даты опроса
 */

 /**
 * Реактивное значение начальной даты
 *  @type {Ref<string>}
 */
const fromDate = ref<string>("");

/**
 * Реактивное значение конечной даты
 *  @type {Ref<string>}
 */
const toDate = ref<string>("");

/**
 * Определение типизированных эмиттеров событий
 * @type {(e: "submit", from: string, to: string) => void}
 */
const emit = defineEmits<{
  (e: "submit", from: string, to: string): void;
}>();

/**
 * Обработчик отправки формы
 * @function submitForm
 * @description Эмитит событие "submit" с выбранными датами
 */
const submitForm = () => {
  emit("submit", fromDate.value, toDate.value);
};
</script>

<style lang="scss" scoped></style>
