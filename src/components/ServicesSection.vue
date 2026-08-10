<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { serviceKeys, getServiceImage } from '../data/services'

const { t } = useI18n()

const services = computed(() =>
  serviceKeys.map((key, index) => ({
    key,
    index,
    title: t(`services.items.${key}.title`),
    tagline: t(`services.items.${key}.tagline`),
    image: getServiceImage(key),
  })),
)
</script>

<template>
  <section id="services" class="bg-white py-24 lg:py-28">
    <div class="mx-auto max-w-6xl px-5 lg:px-8">
      <div class="max-w-2xl">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {{ t('services.eyebrow') }}
        </p>
        <h2 class="mt-3 font-display text-4xl tracking-wider text-navy-900 sm:text-5xl">
          {{ t('services.title') }}
        </h2>
        <p class="mt-6 text-lg leading-[1.85] text-slate-muted">
          {{ t('services.lead') }}
        </p>
      </div>

      <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="service in services"
          :key="service.key"
          :to="`/services/${service.key}`"
          class="group overflow-hidden border border-border bg-white transition hover:border-navy-900"
        >
          <div class="aspect-[16/10] overflow-hidden bg-surface">
            <img
              :src="service.image"
              :alt="service.title"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
          <div class="p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              0{{ service.index + 1 }}
            </p>
            <h3 class="mt-3 text-xl font-semibold tracking-wide text-navy-900">
              {{ service.title }}
            </h3>
            <p class="mt-3 text-sm leading-[1.85] text-slate-muted">
              {{ service.tagline }}
            </p>
            <span class="mt-5 inline-flex text-sm font-semibold text-navy-900 underline-offset-4 group-hover:underline">
              {{ t('services.learnMore') }} →
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
