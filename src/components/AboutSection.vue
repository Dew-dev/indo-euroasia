<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="about" class="bg-white py-24 lg:py-28">
    <div class="mx-auto max-w-6xl px-5 lg:px-8">
      <div class="max-w-2xl">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {{ t('about.title') }}
        </p>
        <h2 class="mt-3 font-display text-4xl tracking-wider text-navy-900 sm:text-5xl">
          {{ t('about.title') }}
        </h2>
        <p class="mt-6 text-lg leading-[1.85] text-slate-ink">
          {{ t('about.lead') }}
        </p>
        <p class="mt-4 text-base leading-[1.85] text-slate-muted">
          {{ t('about.body') }}
        </p>
      </div>

      <div class="mt-14 grid gap-8 border-t border-border pt-12 md:grid-cols-2">
        <div>
          <h3 class="text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
            {{ t('about.visionTitle') }}
          </h3>
          <p class="mt-3 text-base leading-[1.85] text-slate-muted">
            {{ t('about.vision') }}
          </p>
        </div>
        <div>
          <h3 class="text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
            {{ t('about.missionTitle') }}
          </h3>
          <p class="mt-3 text-base leading-[1.85] text-slate-muted">
            {{ t('about.mission') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
