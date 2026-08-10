import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'
import ProjectsRegionView from '../views/ProjectsRegionView.vue'
import CommodityDetailView from '../views/CommodityDetailView.vue'
import ServiceDetailView from '../views/ServiceDetailView.vue'
import MembershipView from '../views/MembershipView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/projects/indonesia',
      name: 'projects-indonesia',
      component: ProjectsRegionView,
      props: { region: 'indonesia' },
    },
    {
      path: '/projects/euroasia',
      name: 'projects-euroasia',
      component: ProjectsRegionView,
      props: { region: 'euroasia' },
    },
    {
      path: '/projects/:slug',
      name: 'project-detail',
      component: ProjectDetailView,
      props: true,
    },
    // Legacy portfolio URLs
    { path: '/portfolio/hadith-hotel', redirect: '/projects/hadith-hotel' },
    { path: '/portfolio/ongoing', redirect: '/projects/euroasia' },
    {
      path: '/commodities/:slug',
      name: 'commodity-detail',
      component: CommodityDetailView,
      props: true,
    },
    {
      path: '/services/:slug',
      name: 'service-detail',
      component: ServiceDetailView,
      props: true,
    },
    {
      path: '/membership',
      name: 'membership',
      component: MembershipView,
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  },
})

export default router
