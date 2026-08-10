<script setup>
import { useI18n } from 'vue-i18n'
import { indonesiaCommodities, eurasiaCommodities } from '../data/commodities'

const { t } = useI18n()
</script>

<template>
  <section id="commodities" class="bg-surface py-24 lg:py-28">
    <div class="mx-auto max-w-6xl px-5 lg:px-8">
      <div class="max-w-2xl">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {{ t('commodities.eyebrow') }}
        </p>
        <h2 class="mt-3 font-display text-4xl tracking-wider text-navy-900 sm:text-5xl">
          {{ t('commodities.title') }}
        </h2>
        <p class="mt-6 text-lg leading-[1.85] text-slate-muted">
          {{ t('commodities.lead') }}
        </p>
      </div>

      <div class="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h3 class="border-b border-border pb-4 text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
            {{ t('commodities.toEurasia') }}
          </h3>
          <ul class="mt-6 grid gap-3 sm:grid-cols-2">
            <li v-for="item in indonesiaCommodities" :key="item.slug">
              <RouterLink
                :to="`/commodities/${item.slug}`"
                class="block border border-border bg-white px-4 py-3.5 text-sm font-medium text-navy-900 transition hover:border-navy-800 hover:bg-white"
              >
                {{ t(`commodities.details.${item.slug}.name`) }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="border-b border-border pb-4 text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
            {{ t('commodities.toIndonesia') }}
          </h3>
          <ul class="mt-6 grid gap-3 sm:grid-cols-2">
            <li v-for="item in eurasiaCommodities" :key="item.slug">
              <RouterLink
                :to="`/commodities/${item.slug}`"
                class="block border border-border bg-white px-4 py-3.5 text-sm font-medium text-navy-900 transition hover:border-navy-800 hover:bg-white"
              >
                {{ t(`commodities.details.${item.slug}.name`) }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
