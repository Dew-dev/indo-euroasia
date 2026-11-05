<script setup>
import { computed, defineAsyncComponent, onUnmounted, ref, watch } from 'vue'
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
  if (
    [
      'egiTower',
      'humble8',
      'agat',
      'egiOptik',
      'egiMilitary',
      'tinProject',
      'galliumProject',
      'egiTravelBuana',
      'sevenOzIndonesia',
    ].includes(key.value)
  ) {
    return '/projects/indonesia'
  }
  return '/projects/euroasia'
})

const galleryItems = computed(() => {
  const list = project.value?.gallery || []
  const hero = project.value?.heroImage
  const seen = new Set()
  return list.filter((item) => {
    if (!item?.src) return false
    if (hero && item.src === hero) return false
    if (seen.has(item.src)) return false
    seen.add(item.src)
    return true
  })
})

const activeIndex = ref(-1)
const lightboxOpen = computed(() => activeIndex.value >= 0)
const activeItem = computed(() =>
  activeIndex.value >= 0 ? galleryItems.value[activeIndex.value] : null,
)

function openLightbox(index) {
  activeIndex.value = index
}

function closeLightbox() {
  activeIndex.value = -1
}

function nextLightbox(delta) {
  const total = galleryItems.value.length
  if (!total || activeIndex.value < 0) return
  activeIndex.value = (activeIndex.value + delta + total) % total
}

function onKeydown(e) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextLightbox(1)
  if (e.key === 'ArrowLeft') nextLightbox(-1)
}

watch(lightboxOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})

const heroIsLogo = computed(() => project.value?.imageFit === 'contain')
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

        <div class="overflow-hidden border border-border bg-white">
          <img
            :src="project.heroImage"
            :alt="t(`${key}.title`)"
            :class="
              heroIsLogo
                ? 'aspect-[4/3] w-full object-contain p-8 sm:p-10'
                : 'aspect-[4/3] w-full object-cover'
            "
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
        v-if="galleryItems.length"
        class="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        <button
          v-for="(item, i) in galleryItems"
          :key="item.src"
          type="button"
          class="group relative aspect-[4/3] overflow-hidden border border-border bg-surface text-left"
          @click="openLightbox(i)"
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.06]"
            loading="lazy"
          />
          <span
            class="pointer-events-none absolute inset-0 bg-navy-950/0 transition duration-300 group-hover:bg-navy-950/25"
          />
          <span
            class="pointer-events-none absolute bottom-3 right-3 translate-y-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            View
          </span>
        </button>
      </div>

      <div class="mt-12 hidden">
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

      <div class="mt-14 border-t border-border pt-10 text-center hidden">
        <p class="text-base font-bold text-navy-900">{{ t(`${key}.footerBrand`) }}</p>
        <p class="mt-2 text-sm text-slate-muted">{{ t(`${key}.footerTagline`) }}</p>
        <p class="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {{ t(`${key}.footerMotto`) }}
        </p>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="lightboxOpen && activeItem"
        class="fixed inset-0 z-[80] flex items-center justify-center bg-navy-950/90 p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        @click.self="closeLightbox"
      >
        <button
          type="button"
          class="absolute right-4 top-4 z-[81] text-sm font-semibold uppercase tracking-[0.14em] text-white/80 transition hover:text-white"
          @click="closeLightbox"
        >
          Close
        </button>
        <button
          v-if="galleryItems.length > 1"
          type="button"
          class="absolute left-3 top-1/2 z-[81] -translate-y-1/2 px-3 py-4 text-2xl text-white/70 transition hover:text-white sm:left-6"
          aria-label="Previous"
          @click="nextLightbox(-1)"
        >
          ‹
        </button>
        <button
          v-if="galleryItems.length > 1"
          type="button"
          class="absolute right-3 top-1/2 z-[81] -translate-y-1/2 px-3 py-4 text-2xl text-white/70 transition hover:text-white sm:right-6"
          aria-label="Next"
          @click="nextLightbox(1)"
        >
          ›
        </button>
        <figure class="flex max-h-full max-w-6xl flex-col items-center gap-3">
          <img
            :src="activeItem.src"
            :alt="activeItem.alt"
            class="max-h-[min(82vh,900px)] w-auto max-w-full object-contain"
          />
          <figcaption class="max-w-3xl text-center text-sm text-white/70">
            {{ activeItem.alt }}
          </figcaption>
        </figure>
      </div>
    </Teleport>
  </section>

  <section v-else class="bg-white px-5 pt-28 pb-20 text-center">
    <p class="text-slate-muted">Project not found.</p>
    <RouterLink to="/projects/euroasia" class="mt-4 inline-block text-sm font-semibold text-navy-900">
      ← Back to projects
    </RouterLink>
  </section>
</template>
