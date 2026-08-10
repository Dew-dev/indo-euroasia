<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="membership" class="bg-surface py-24 lg:py-28">
    <div class="mx-auto max-w-6xl px-5 lg:px-8">
      <div class="max-w-2xl">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {{ t('membership.eyebrow') }}
        </p>
        <h2 class="mt-3 font-display text-4xl tracking-wider text-navy-900 sm:text-5xl">
          {{ t('membership.title') }}
        </h2>
        <p class="mt-5 font-display text-2xl italic tracking-wide text-navy-800">
          {{ t('membership.lead') }}
        </p>
        <p class="mt-5 text-base leading-[1.85] text-slate-muted">
          {{ t('membership.teaser') }}
        </p>
      </div>

      <div class="mt-10 flex flex-wrap gap-3">
        <RouterLink
          to="/membership"
          class="inline-flex items-center rounded-md bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-800"
        >
          {{ t('membership.viewPlans') }} →
        </RouterLink>
        <RouterLink
          to="/#contact"
          class="inline-flex items-center rounded-md border border-border bg-white px-6 py-3.5 text-sm font-semibold text-navy-900 transition hover:bg-white"
        >
          {{ t('membership.cta') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
