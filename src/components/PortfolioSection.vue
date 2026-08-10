<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const indonesiaProjects = computed(() => tm('portfolio.ongoingIndonesia'))
const eurasiaProjects = computed(() => tm('portfolio.ongoingEurasia'))
</script>

<template>
  <section id="projects" class="bg-surface py-24 lg:py-28">
    <div class="mx-auto max-w-6xl px-5 lg:px-8">
      <div class="max-w-2xl">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {{ t('portfolio.eyebrow') }}
        </p>
        <h2 class="mt-3 font-display text-4xl tracking-wider text-navy-900 sm:text-5xl">
          {{ t('portfolio.title') }}
        </h2>
        <p class="mt-6 text-lg leading-[1.85] text-slate-ink">
          {{ t('portfolio.lead') }}
        </p>
        <p class="mt-4 text-base leading-[1.85] text-slate-muted">
          {{ t('portfolio.body') }}
        </p>
      </div>

      <div class="mt-14 grid gap-8 lg:grid-cols-2">
        <div id="projects-indonesia" class="scroll-mt-28 border border-border bg-white p-6 lg:p-8">
          <h3 class="text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
            {{ t('portfolio.indonesia') }}
          </h3>
          <p class="mt-3 text-sm leading-[1.85] text-slate-muted">
            {{ t('portfolio.indonesiaLead') }}
          </p>
          <ul class="mt-6 space-y-4">
            <li
              v-for="(item, i) in indonesiaProjects"
              :key="`id-${i}`"
              class="border-t border-border pt-4 first:border-0 first:pt-0"
            >
              <RouterLink
                v-if="item.slug"
                :to="`/projects/${item.slug}`"
                class="group block"
              >
                <p class="text-sm font-semibold text-navy-900 group-hover:underline">{{ item.title }}</p>
                <p class="mt-1 text-sm text-slate-muted">{{ item.desc }}</p>
              </RouterLink>
              <template v-else>
                <p class="text-sm font-semibold text-navy-900">{{ item.title }}</p>
                <p class="mt-1 text-sm text-slate-muted">{{ item.desc }}</p>
              </template>
            </li>
          </ul>
          <RouterLink
            to="/projects/indonesia"
            class="mt-6 inline-flex text-sm font-semibold text-navy-900 underline-offset-4 hover:underline"
          >
            {{ t('portfolio.viewIndonesia') }} →
          </RouterLink>
        </div>

        <div id="projects-euroasia" class="scroll-mt-28 border border-border bg-white p-6 lg:p-8">
          <h3 class="text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
            {{ t('portfolio.euroasia') }}
          </h3>
          <p class="mt-3 text-sm leading-[1.85] text-slate-muted">
            {{ t('portfolio.euroasiaLead') }}
          </p>
          <ul class="mt-6 space-y-4">
            <li
              v-for="(item, i) in eurasiaProjects"
              :key="`eu-${i}`"
              class="border-t border-border pt-4 first:border-0 first:pt-0"
            >
              <RouterLink
                v-if="item.slug"
                :to="`/projects/${item.slug}`"
                class="group block"
              >
                <p class="text-sm font-semibold text-navy-900 group-hover:underline">{{ item.title }}</p>
                <p class="mt-1 text-sm text-slate-muted">{{ item.desc }}</p>
              </RouterLink>
              <template v-else>
                <p class="text-sm font-semibold text-navy-900">{{ item.title }}</p>
                <p class="mt-1 text-sm text-slate-muted">{{ item.desc }}</p>
              </template>
            </li>
          </ul>
          <RouterLink
            to="/projects/euroasia"
            class="mt-6 inline-flex text-sm font-semibold text-navy-900 underline-offset-4 hover:underline"
          >
            {{ t('portfolio.viewEuroasia') }} →
          </RouterLink>
        </div>
      </div>

      <p class="mt-14 text-xs font-semibold uppercase tracking-[0.16em] text-slate-muted">
        {{ t('portfolio.featuredLabel') }}
      </p>

      <RouterLink
        to="/projects/hadith-hotel"
        class="mt-6 group grid overflow-hidden border border-border bg-white transition hover:border-navy-800 lg:grid-cols-2"
      >
        <div class="aspect-[4/3] overflow-hidden bg-surface lg:aspect-auto lg:min-h-[320px]">
          <img
            src="/images/hadith-hotel-exterior.webp"
            :alt="t('portfolio.hadithCard.name')"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div class="flex flex-col justify-center p-7 lg:p-10">
          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {{ t('portfolio.hadithCard.location') }}
          </p>
          <h3 class="mt-3 text-2xl font-semibold text-navy-900">
            {{ t('portfolio.hadithCard.name') }}
          </h3>
          <p class="mt-3 font-display text-xl italic text-navy-800">
            {{ t('portfolio.hadithCard.tagline') }}
          </p>
          <p class="mt-4 text-sm leading-[1.85] text-slate-muted">
            {{ t('portfolio.hadithCard.desc') }}
          </p>
          <span class="mt-6 inline-flex text-sm font-semibold text-navy-900 underline-offset-4 group-hover:underline">
            {{ t('portfolio.readMore') }} →
          </span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
