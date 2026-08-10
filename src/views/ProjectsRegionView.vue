<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { projectDetails } from '../data/projects'

const props = defineProps({
  region: {
    type: String,
    required: true,
    validator: (v) => ['indonesia', 'euroasia'].includes(v),
  },
})

const { t, tm } = useI18n()
const route = useRoute()

const regionKey = computed(() => props.region || route.params.region)
const isIndonesia = computed(() => regionKey.value === 'indonesia')

const projects = computed(() =>
  isIndonesia.value ? tm('portfolio.ongoingIndonesia') : tm('portfolio.ongoingEurasia'),
)

const linkedProjects = computed(() => projects.value.filter((p) => p.slug))

const title = computed(() =>
  isIndonesia.value ? t('portfolio.indonesia') : t('portfolio.euroasia'),
)

const lead = computed(() =>
  isIndonesia.value ? t('portfolio.indonesiaLead') : t('portfolio.euroasiaLead'),
)

const backTo = computed(() =>
  isIndonesia.value ? '/#projects-indonesia' : '/#projects-euroasia',
)

function thumb(slug) {
  return projectDetails[slug]?.heroImage || ''
}
</script>

<template>
  <section class="bg-white pt-28 pb-20">
    <div class="mx-auto max-w-6xl px-5 lg:px-8">
      <RouterLink
        :to="backTo"
        class="text-sm font-semibold text-slate-muted transition hover:text-navy-900"
      >
        ← {{ t('hadith.back') }}
      </RouterLink>

      <p class="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {{ t('portfolio.eyebrow') }}
      </p>
      <h1 class="mt-3 font-display text-4xl tracking-wider text-navy-900 sm:text-5xl">
        {{ title }}
      </h1>
      <p class="mt-4 max-w-2xl text-base text-slate-muted">
        {{ lead }}
      </p>

      <ul class="mt-12 max-w-3xl space-y-5 border border-border bg-surface p-7">
        <li
          v-for="(item, i) in projects"
          :key="i"
          class="border-t border-border pt-5 first:border-0 first:pt-0"
        >
          <RouterLink
            v-if="item.slug"
            :to="`/projects/${item.slug}`"
            class="group block"
          >
            <p class="text-lg font-semibold text-navy-900 group-hover:underline">{{ item.title }}</p>
            <p class="mt-2 text-sm leading-[1.85] text-slate-muted">{{ item.desc }}</p>
          </RouterLink>
          <template v-else>
            <p class="text-lg font-semibold text-navy-900">{{ item.title }}</p>
            <p class="mt-2 text-sm leading-[1.85] text-slate-muted">{{ item.desc }}</p>
          </template>
        </li>
      </ul>

      <div
        v-if="linkedProjects.length"
        class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <RouterLink
          v-for="item in linkedProjects"
          :key="item.slug"
          :to="`/projects/${item.slug}`"
          class="group overflow-hidden border border-border bg-white transition hover:border-navy-800"
        >
          <div class="aspect-[4/3] overflow-hidden bg-surface">
            <img
              :src="thumb(item.slug)"
              :alt="item.title"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div class="p-5">
            <p class="text-sm font-semibold text-navy-900">{{ item.title }}</p>
            <p class="mt-2 text-sm text-slate-muted">{{ item.desc }}</p>
            <span class="mt-4 inline-flex text-sm font-semibold text-navy-900 underline-offset-4 group-hover:underline">
              {{ t('portfolio.readMore') }} →
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
