<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { serviceKeys, getServiceImage } from '../data/services'

const props = defineProps({
  slug: { type: String, required: true },
})

const { t, tm, te } = useI18n()
const route = useRoute()

const slug = computed(() => props.slug || route.params.slug)
const valid = computed(() => te(`services.items.${slug.value}.title`))
const image = computed(() => getServiceImage(slug.value))

const list = computed(() =>
  valid.value ? tm(`services.items.${slug.value}.list`) : [],
)

const otherServices = computed(() =>
  serviceKeys
    .filter((key) => key !== slug.value)
    .map((key) => ({
      key,
      title: t(`services.items.${key}.title`),
      image: getServiceImage(key),
    })),
)
</script>

<template>
  <section class="bg-white pt-28 pb-20">
    <div class="mx-auto max-w-6xl px-5 lg:px-8">
      <RouterLink
        to="/#services"
        class="text-sm font-semibold text-slate-muted transition hover:text-navy-900"
      >
        ← {{ t('services.back') }}
      </RouterLink>

      <div v-if="valid" class="mt-8">
        <div class="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {{ t('services.eyebrow') }}
            </p>
            <h1 class="mt-3 font-display text-4xl tracking-wider text-navy-900 sm:text-5xl">
              {{ t(`services.items.${slug}.title`) }}
            </h1>
            <p class="mt-5 font-display text-2xl italic tracking-wide text-navy-800">
              {{ t(`services.items.${slug}.tagline`) }}
            </p>
            <p class="mt-6 text-base leading-[1.85] text-slate-muted sm:text-lg">
              {{ t(`services.items.${slug}.desc`) }}
            </p>
          </div>

          <div class="overflow-hidden border border-border">
            <img
              :src="image"
              :alt="t(`services.items.${slug}.title`)"
              class="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>

        <p class="mt-12 text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
          {{ t(`services.items.${slug}.listLabel`) }}
        </p>
        <ul class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="item in list"
            :key="item"
            class="border border-border bg-surface px-5 py-4 text-sm font-medium text-navy-900"
          >
            {{ item }}
          </li>
        </ul>

        <div class="mt-12 flex flex-wrap gap-3">
          <RouterLink
            to="/#contact"
            class="inline-flex items-center rounded-md bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-800"
          >
            {{ t('nav.cta') }}
          </RouterLink>
          <RouterLink
            to="/membership"
            class="inline-flex items-center rounded-md border border-border px-6 py-3.5 text-sm font-semibold text-navy-900 transition hover:bg-surface"
          >
            {{ t('nav.membership') }}
          </RouterLink>
        </div>

        <div class="mt-16 border-t border-border pt-10">
          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-muted">
            {{ t('services.otherServices') }}
          </p>
          <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <RouterLink
              v-for="item in otherServices"
              :key="item.key"
              :to="`/services/${item.key}`"
              class="group overflow-hidden border border-border transition hover:border-navy-900"
            >
              <div class="aspect-[16/10] overflow-hidden bg-surface">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <p class="px-4 py-3 text-sm font-semibold text-navy-900">
                {{ item.title }}
              </p>
            </RouterLink>
          </div>
        </div>
      </div>

      <div v-else class="mt-16 text-center">
        <p class="text-slate-muted">Service not found.</p>
        <RouterLink to="/#services" class="mt-4 inline-block text-sm font-semibold text-navy-900">
          {{ t('services.back') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
