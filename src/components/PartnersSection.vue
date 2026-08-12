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
    name: 'Hadith Hotel',
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
  <section
    id="partners"
    class="relative overflow-hidden border-t border-border py-20 lg:py-24"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#dce7f3_0%,_#f5f7fa_42%,_#e4ebf3_100%)]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.4]"
      style="background-image: linear-gradient(rgba(12, 35, 64, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(12, 35, 64, 0.045) 1px, transparent 1px); background-size: 28px 28px;"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-6xl px-5 lg:px-8">
      <h2 class="font-display text-4xl tracking-wider text-navy-900 sm:text-5xl">
        {{ t('partners.title') }}
      </h2>

      <ul class="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <li v-for="partner in partners" :key="partner.name">
          <a
            :href="partner.href"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center text-center transition hover:opacity-80"
          >
            <div class="flex h-40 w-full items-center justify-center sm:h-44">
              <img
                :src="partner.logo"
                :alt="partner.name"
                class="h-36 w-36 object-contain sm:h-40 sm:w-40"
              />
            </div>
            <p class="mt-4 text-sm font-semibold leading-snug tracking-wide text-navy-900">
              {{ partner.name }}
            </p>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
