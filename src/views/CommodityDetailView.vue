<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { findCommodity } from '../data/commodities'

const LocationMap = defineAsyncComponent(() => import('../components/LocationMap.vue'))

const props = defineProps({
  slug: { type: String, required: true },
})

const { t, te } = useI18n()

const commodity = computed(() => findCommodity(props.slug))
const hasDetail = computed(() => te(`commodities.details.${props.slug}.name`))

const infoBlocks = computed(() => [
  { key: 'production', label: t('commodities.production') },
  { key: 'locations', label: t('commodities.locations') },
  { key: 'types', label: t('commodities.types') },
  { key: 'quality', label: t('commodities.quality') },
  { key: 'opportunity', label: t('commodities.marketOpportunity') },
])
</script>

<template>
  <section class="bg-white pt-28 pb-20">
    <div class="mx-auto max-w-6xl px-5 lg:px-8">
      <RouterLink
        to="/#commodities"
        class="text-sm font-semibold text-slate-muted transition hover:text-navy-900"
      >
        ← {{ t('commodities.back') }}
      </RouterLink>

      <div v-if="commodity && hasDetail" class="mt-8">
        <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div class="overflow-hidden border border-border lg:sticky lg:top-28">
            <img
              :src="commodity.image"
              :alt="t(`commodities.details.${slug}.name`)"
              class="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {{ t('commodities.eyebrow') }}
            </p>
            <h1 class="mt-3 font-display text-4xl tracking-wider text-navy-900 sm:text-5xl">
              {{ t(`commodities.details.${slug}.name`) }}
            </h1>
            <p class="mt-5 text-lg leading-[1.85] text-slate-ink">
              {{ t(`commodities.details.${slug}.overview`) }}
            </p>
            <p class="mt-4 text-base leading-[1.85] text-slate-muted">
              {{ t(`commodities.details.${slug}.body`) }}
            </p>
          </div>
        </div>

        <div class="mt-14">
          <h2 class="text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
            {{ t('commodities.mapTitle') }}
          </h2>
          <p class="mt-2 text-sm text-slate-muted">
            {{ t('commodities.mapLead') }}
          </p>
          <div class="mt-5 overflow-hidden rounded-md">
            <LocationMap
              :key="slug"
              :locations="commodity.locations || []"
              :center="commodity.mapCenter || [0, 100]"
              :zoom="commodity.mapZoom || 4"
            />
          </div>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li
              v-for="loc in commodity.locations"
              :key="`${loc.name}-${loc.lat}`"
              class="border border-border bg-surface px-3 py-1.5 text-xs font-medium text-navy-900"
            >
              {{ loc.name }}
            </li>
          </ul>
        </div>

        <div class="mt-14 grid gap-5 md:grid-cols-2">
          <article
            v-for="block in infoBlocks"
            :key="block.key"
            class="border border-border bg-surface p-6"
            :class="block.key === 'opportunity' ? 'md:col-span-2' : ''"
          >
            <h2 class="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {{ block.label }}
            </h2>
            <p class="mt-3 text-sm leading-[1.85] text-navy-900">
              {{ t(`commodities.details.${slug}.${block.key}`) }}
            </p>
          </article>
        </div>

        <p class="mt-10 text-sm italic text-slate-muted">
          {{ t('commodities.whyTrade') }}
        </p>
      </div>

      <div v-else class="mt-16 text-center">
        <p class="text-slate-muted">Commodity not found.</p>
        <RouterLink to="/#commodities" class="mt-4 inline-block text-sm font-semibold text-navy-900">
          {{ t('commodities.back') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
