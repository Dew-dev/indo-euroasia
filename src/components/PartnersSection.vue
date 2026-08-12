<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const partners = computed(() => tm('partners.items'))
</script>

<template>
  <section id="partners" class="border-t border-border bg-surface py-20 lg:py-24">
    <div class="mx-auto max-w-6xl px-5 lg:px-8">
      <div class="max-w-2xl">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {{ t('partners.eyebrow') }}
        </p>
        <h2 class="mt-3 font-display text-4xl tracking-wider text-navy-900 sm:text-5xl">
          {{ t('partners.title') }}
        </h2>
      </div>

      <ul class="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
        <li
          v-for="name in partners"
          :key="name"
          class="flex items-center justify-center border-t border-border pt-6 text-center"
        >
          <span class="text-sm font-semibold tracking-[0.08em] text-navy-900 uppercase">
            {{ name }}
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>
