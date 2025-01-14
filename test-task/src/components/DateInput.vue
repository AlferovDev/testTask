<template>
  <v-text-field
    v-model="date"
    :label="label"
    type="date"
    :min="minDate"
    :max="maxDate"
    :clearable="clearable"
    :readonly="readonly"
    :disabled="disabled"
    variant="outlined"
    @update:modelValue="updateDate"
  >
  </v-text-field>
</template>

<script setup lang="ts">
import { ref } from "vue";

/**
 * Компонент для ввода даты 
 * 
 * @component DateInput
 * @description Компонент для ввода даты с поддержкой диапазона дат, обязательности поля, возможности очистки поля
 */

 interface Props {
  /** Значение даты */
  modelValue: string;
  /** Текст метки поля ввода */
  label?: string;
  /** Минимальная допустимая дата */
  minDate?: string;
  /** Максимальная допустимая дата */
  maxDate?: string;
  /** Флаг обязательности поля */
  required?: boolean;
  /** Флаг возможности очистки поля */
  clearable?: boolean;
  /** Флаг только для чтения */
  readonly?: boolean;
  /** Флаг отключения поля */
  disabled?: boolean;
}

/**
 * Пропсы компонента с значениями по умолчанию
 */

const props = withDefaults(defineProps<Props>(), {
  label: "Выберите дату",
  minDate: "",
  maxDate: "",
  required: false,
  clearable: true,
  readonly: false,
  disabled: false,
});

/**
 * Эмиттер событий
 */

const emit = defineEmits(["update:modelValue"]);

/**
 * Реактивное значение даты
 */
const date = ref(props.modelValue);

/**
 * Обновляет значение даты и эмитит событие обновления
 * @param {string} newValue - Новое значение даты
 */
function updateDate(newValue: string) {
  date.value = newValue;
  emit("update:modelValue", newValue);
}
</script>

<style lang="scss" scoped>
</style>
