import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import LoginPage from '../views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'
import BoardView from '@/views/BoardsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import TasksView from '@/views/TasksView.vue'
// import BoardsView from '@/views/PrfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signup',
      name: 'signupForm',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SignUpView,
    },
    {
      path: '/login',
      name: 'loginForm',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginView,
    },
    {
      path: '/boards',
      name: 'boards',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: BoardView,
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ProfileView,
    },
    {
      path: '/boards/:id', // Dynamic route for board details
      name: 'TasksView',
      component: TasksView, // Your board details component
      props: true, //
    },
    // Pass `id` as a prop
  ],
})

export default router
