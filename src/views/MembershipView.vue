<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const headers = computed(() => tm('membership.table.headers'))
const rows = computed(() => tm('membership.table.rows'))
const tierKeys = ['lite', 'pro', 'enterprise']
</script>

<template>
  <section class="bg-white pt-28 pb-20">
    <div class="mx-auto max-w-6xl px-5 lg:px-8">
      <RouterLink
        to="/#membership"
        class="text-sm font-semibold text-slate-muted transition hover:text-navy-900"
      >
        ← {{ t('membership.back') }}
      </RouterLink>

      <div class="mt-8 max-w-3xl">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {{ t('membership.eyebrow') }}
        </p>
        <h1 class="mt-3 font-display text-4xl tracking-wider text-navy-900 sm:text-5xl">
          {{ t('membership.title') }}
        </h1>
        <p class="mt-5 font-display text-2xl italic tracking-wide text-navy-800">
          {{ t('membership.lead') }}
        </p>
        <p class="mt-5 text-base leading-[1.85] text-slate-muted sm:text-lg">
          {{ t('membership.body') }}
        </p>
      </div>

      <div class="mt-12 overflow-x-auto border border-border bg-white">
        <table class="min-w-[720px] w-full border-collapse text-left text-sm">
          <thead>
            <tr class="border-b border-border bg-navy-950 text-white">
              <th
                v-for="(header, i) in headers"
                :key="header"
                class="px-4 py-4 font-semibold tracking-wide"
                :class="i === 0 ? 'text-left' : 'text-center'"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in rows"
              :key="row.benefit"
              class="border-b border-border last:border-0"
              :class="index % 2 === 1 ? 'bg-surface/70' : 'bg-white'"
            >
              <td class="px-4 py-3.5 font-medium text-navy-900">{{ row.benefit }}</td>
              <td class="px-4 py-3.5 text-center text-slate-muted">{{ row.lite }}</td>
              <td class="px-4 py-3.5 text-center text-slate-muted">{{ row.pro }}</td>
              <td class="px-4 py-3.5 text-center font-medium text-navy-900">{{ row.enterprise }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="mt-12 text-xs font-semibold uppercase tracking-[0.16em] text-slate-muted">
        {{ t('membership.tiersLabel') }}
      </p>
      <div class="mt-5 grid gap-5 lg:grid-cols-3">
        <article
          v-for="key in tierKeys"
          :key="key"
          class="border border-border bg-surface p-6"
          :class="key === 'enterprise' ? 'border-navy-900 bg-white' : ''"
        >
          <h2 class="text-xl font-semibold tracking-wide text-navy-900">
            {{ t(`membership.tiers.${key}.name`) }}
          </h2>
          <p class="mt-3 text-sm leading-[1.85] text-slate-muted">
            {{ t(`membership.tiers.${key}.desc`) }}
          </p>
        </article>
      </div>

      <div class="mt-10">
        <RouterLink
          to="/#contact"
          class="inline-flex items-center rounded-md bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-800"
        >
          {{ t('membership.cta') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
