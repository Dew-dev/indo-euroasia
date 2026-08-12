<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const partners = [
  {
    name: '7oz Espresso',
    href: 'https://7oz-espresso.com',
    logo: '/images/partners/7oz.png',
  },
  {
    name: 'Hadith',
    href: 'https://hadith-hotel.com',
    logo: '/images/partners/hadith.png',
  },
  {
    name: 'Kampoeng Indonesia Hotel',
    href: 'https://hotel-kampoengindonesia.com/',
    logo: '/images/partners/kampoeng.png',
  },
  {
    name: 'Saji Nusantara',
    href: 'https://saji-nusantara.com/id',
    logo: '/images/partners/saji-nusantara.png',
  },
  {
    name: 'Humble 8',
    href: 'https://humble8.com/id',
    logo: '/images/partners/humble8.png',
  },
]
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

      <ul class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        <li v-for="partner in partners" :key="partner.name">
          <a
            :href="partner.href"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center text-center transition hover:opacity-80"
          >
            <div class="flex h-28 w-full items-center justify-center">
              <img
                :src="partner.logo"
                :alt="partner.name"
                class="h-24 w-24 object-contain"
              />
            </div>
            <p class="mt-3 text-sm font-semibold leading-snug tracking-wide text-navy-900">
              {{ partner.name }}
            </p>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
