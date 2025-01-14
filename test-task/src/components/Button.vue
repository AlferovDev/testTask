<template>
  <v-btn
    :color="color"
    :variant="variant"
    :size="size"
    :disabled="disabled"
    :rounded="rounded"
    @click="handleClick"
    @touchstart="handleClick"
  >
    <slot>{{ label }}</slot>
  </v-btn>
</template>

<script setup lang="ts">
/**
 * Компонент кнопки, обертка над v-btn из Vuetify с дополнительными настройками.
 *
 * @component Button
 * @description Компонент кнопки с дополнительными настройками.
 */

interface Props {
  /** Текст кнопки */
  label?: string;
  /** Цвет кнопки */
  color?: string;
  /** Вариант отображения кнопки */
  variant?: "text" | "flat" | "elevated" | "tonal" | "outlined" | "plain";
  /** Размер кнопки */
  size?: "x-small" | "small" | "default" | "large" | "x-large";
  /** Флаг, указывающий, отключена ли кнопка */
  disabled?: boolean;
  /** Флаг, указывающий, должна ли кнопка иметь скругленные углы */
  rounded?: boolean;
}

/**
 * Пропсы компонента с значениями по умолчанию
 */

const props = withDefaults(defineProps<Props>(), {
  label: "",
  color: "primary",
  variant: "elevated",
  size: "default",
  disabled: false,
  rounded: false,
});

/**
 * Событие, вызываемое при клике на кнопку
 * @event click
 * @type {MouseEvent | TouchEvent}
 */
const emit = defineEmits(["click"]);

/**
 * Обработчик клика по кнопке
 * @param {MouseEvent | TouchEvent} event - Событие клика
 */
const handleClick = (event: MouseEvent | TouchEvent) => {
  if (!props.disabled) {
    if(event.type === "touchstart") {
      event.preventDefault();
    }
    emit("click", event);
  }
};
</script>

<style lang="scss" scoped>
v-btn {
  user-select: none;
}
</style>
