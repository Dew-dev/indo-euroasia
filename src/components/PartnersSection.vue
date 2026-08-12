<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const partners = [
  {
    name: '7oz Espresso',
    href: 'https://7oz-espresso.com',
    logo: '/images/partners/7oz.webp',
    dark: true,
  },
  {
    name: 'Hadith',
    href: 'https://hadith-hotel.com',
    logo: '/images/partners/hadith.png',
    dark: true,
  },
  {
    name: 'Kampoeng Indonesia Hotel',
    href: 'https://hotel-kampoengindonesia.com/',
    logo: '/images/partners/kampoeng.png',
    dark: true,
  },
  {
    name: 'Saji Nusantara',
    href: 'https://saji-nusantara.com/id',
    logo: '/images/partners/saji-nusantara.png',
    dark: false,
  },
  {
    name: 'Humble 8',
    href: 'https://humble8.com/id',
    logo: '/images/partners/humble8.jpeg',
    dark: false,
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

      <ul class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <li v-for="partner in partners" :key="partner.name">
          <component
            :is="partner.href ? 'a' : 'div'"
            :href="partner.href || undefined"
            :target="partner.href ? '_blank' : undefined"
            :rel="partner.href ? 'noopener noreferrer' : undefined"
            class="flex h-28 items-center justify-center px-4 transition"
            :class="[
              partner.dark ? 'bg-navy-950' : 'border border-border bg-white',
              partner.href ? 'hover:opacity-90' : '',
            ]"
          >
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="max-h-16 w-auto max-w-full object-contain"
            />
          </component>
        </li>
      </ul>
    </div>
  </section>
</template>
