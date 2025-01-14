import { createRouter, createWebHistory } from 'vue-router'
import SurveyPage from '@/pages/SurveyPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'survey',
      component: SurveyPage,
    },
  ],
})

export default router
