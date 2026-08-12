<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { projectDetails } from '../data/projects'

const LocationMap = defineAsyncComponent(() => import('../components/LocationMap.vue'))

const props = defineProps({
  slug: {
    type: String,
    default: '',
  },
})

const route = useRoute()
const { t, te, tm } = useI18n()

const projectSlug = computed(() => props.slug || route.params.slug)
const project = computed(() => projectDetails[projectSlug.value] || null)
const key = computed(() => project.value?.i18nKey || '')

const impactItems = computed(() => {
  if (!key.value) return []
  return tm(`${key.value}.impactItems`) || []
})

const paragraphs = computed(() => {
  if (!key.value) return []
  return ['p1', 'p2', 'p3', 'p4']
    .filter((p) => te(`${key.value}.${p}`))
    .map((p) => t(`${key.value}.${p}`))
})

const overviewFields = computed(() => {
  if (!key.value) return []
  const fields = [
    ['sector', 'sectorValue'],
    ['origin', 'originValue'],
    ['locationLabel', 'locationValue'],
    ['category', 'categoryValue'],
    ['capacity', 'capacityValue'],
    ['positioning', 'positioningValue'],
  ]
  return fields
    .filter(([, valueKey]) => te(`${key.value}.${valueKey}`))
    .map(([labelKey, valueKey]) => ({
      label: t(`${key.value}.${labelKey}`),
      value: t(`${key.value}.${valueKey}`),
    }))
})

const hasInvestment = computed(() => key.value && te(`${key.value}.investmentTitle`))
const backTo = computed(() => {
  if (['egiTower', 'humble8'].includes(key.value)) return '/projects/indonesia'
  return '/projects/euroasia'
})
</script>

<template>
  <section v-if="project" class="bg-white pt-28 pb-20">
    <div class="mx-auto max-w-6xl px-5 lg:px-8">
      <RouterLink
        :to="backTo"
        class="text-sm font-semibold text-slate-muted transition hover:text-navy-900"
      >
        ← {{ t(`${key}.back`) }}
      </RouterLink>

      <div class="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {{ t(`${key}.eyebrow`) }}
          </p>
          <h1 class="mt-3 font-display text-4xl tracking-wider text-navy-900 sm:text-5xl">
            {{ t(`${key}.title`) }}
          </h1>
          <p class="mt-4 font-display text-2xl italic text-navy-800">
            {{ t(`${key}.tagline`) }}
          </p>
          <p class="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-muted">
            {{ t(`${key}.location`) }}
          </p>

          <div class="mt-8 space-y-5 text-base leading-[1.85] text-slate-muted">
            <p v-for="(para, i) in paragraphs" :key="i">{{ para }}</p>
          </div>
        </div>

        <div class="overflow-hidden border border-border">
          <img
            :src="project.heroImage"
            :alt="t(`${key}.title`)"
            class="aspect-[4/3] w-full object-cover"
          />
          <a
            v-if="project.website"
            :href="project.website"
            target="_blank"
            rel="noopener noreferrer"
            class="block border-t border-border bg-surface px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy-900 transition hover:bg-white"
          >
            {{ project.websiteLabel }} ↗
          </a>
        </div>
      </div>

      <div
        v-if="project.gallery?.length"
        class="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        <div
          v-for="item in project.gallery"
          :key="item.src"
          class="overflow-hidden border border-border"
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <div class="mt-12">
        <h2 class="text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
          {{ t('commodities.mapTitle') }}
        </h2>
        <p class="mt-2 text-sm text-slate-muted">{{ t(`${key}.location`) }}</p>
        <div class="mt-5 overflow-hidden rounded-md">
          <LocationMap
            :locations="project.locations"
            :center="project.mapCenter"
            :zoom="project.mapZoom"
          />
        </div>
      </div>

      <div class="mt-14 border border-border bg-surface p-7 lg:p-10">
        <h2 class="text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
          {{ t(`${key}.overviewTitle`) }}
        </h2>
        <dl class="mt-6 grid gap-5 sm:grid-cols-2">
          <div v-for="field in overviewFields" :key="field.label">
            <dt class="text-xs uppercase tracking-[0.12em] text-slate-muted">{{ field.label }}</dt>
            <dd class="mt-1 text-sm font-semibold text-navy-900">{{ field.value }}</dd>
          </div>
        </dl>
        <p class="mt-6 text-sm leading-[1.85] text-slate-muted">
          {{ t(`${key}.closing`) }}
        </p>
      </div>

      <div class="mt-12">
        <h2 class="font-display text-3xl tracking-wider text-navy-900">
          {{ t(`${key}.impactTitle`) }}
        </h2>
        <p class="mt-3 text-base text-slate-muted">{{ t(`${key}.impactLead`) }}</p>
        <ul class="mt-6 grid gap-3 sm:grid-cols-2">
          <li
            v-for="(item, i) in impactItems"
            :key="i"
            class="border border-border bg-white px-5 py-4 text-sm font-medium text-navy-900"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <div v-if="hasInvestment" class="mt-12 border border-border bg-white p-7 lg:p-10">
        <h2 class="font-display text-3xl tracking-wider text-navy-900">
          {{ t(`${key}.investmentTitle`) }}
        </h2>
        <div class="mt-5 space-y-4 text-base leading-[1.85] text-slate-muted">
          <p v-if="te(`${key}.investmentP1`)">{{ t(`${key}.investmentP1`) }}</p>
          <p v-if="te(`${key}.investmentP2`)">{{ t(`${key}.investmentP2`) }}</p>
        </div>
      </div>

      <div class="mt-14 border-t border-border pt-10 text-center">
        <p class="text-base font-bold text-navy-900">{{ t(`${key}.footerBrand`) }}</p>
        <p class="mt-2 text-sm text-slate-muted">{{ t(`${key}.footerTagline`) }}</p>
        <p class="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {{ t(`${key}.footerMotto`) }}
        </p>
      </div>
    </div>
  </section>

  <section v-else class="bg-white px-5 pt-28 pb-20 text-center">
    <p class="text-slate-muted">Project not found.</p>
    <RouterLink to="/projects/euroasia" class="mt-4 inline-block text-sm font-semibold text-navy-900">
      ← Back to projects
    </RouterLink>
  </section>
</template>
