<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const slides = [
  {
    key: 'indonesia',
    src: '/images/hero/indonesia.jpg',
    alt: 'Bali rice terraces, Indonesia',
  },
  {
    key: 'russia',
    src: '/images/hero/russia.jpg',
    alt: 'Saint Basil Cathedral, Moscow, Russia',
  },
  {
    key: 'belarus',
    src: '/images/hero/belarus.jpg',
    alt: 'Minsk skyline, Belarus',
  },
  {
    key: 'kazakhstan',
    src: '/images/hero/kazakhstan.jpg',
    alt: 'Baiterek Tower, Astana, Kazakhstan',
  },
  {
    key: 'uzbekistan',
    src: '/images/hero/uzbekistan.jpg',
    alt: 'Registan Square, Samarkand, Uzbekistan',
  },
  {
    key: 'kyrgyzstan',
    src: '/images/hero/kyrgyzstan.jpg',
    alt: 'Issyk-Kul lake, Kyrgyzstan',
  },
  {
    key: 'tajikistan',
    src: '/images/hero/tajikistan.jpg',
    alt: 'Pamir Highway, Tajikistan',
  },
  {
    key: 'turkmenistan',
    src: '/images/hero/turkmenistan.jpg',
    alt: 'Ashgabat, Turkmenistan',
  },
  {
    key: 'azerbaijan',
    src: '/images/hero/azerbaijan.jpg',
    alt: 'Flame Towers, Baku, Azerbaijan',
  },
  {
    key: 'armenia',
    src: '/images/hero/armenia.jpg',
    alt: 'Khor Virap and Mount Ararat, Armenia',
  },
]

const activeIndex = ref(0)
const kenBurnsOn = ref(true)
const isAnimating = ref(false)
let timer = null

const activeCountry = computed(() =>
  t(`hero.countries.${slides[activeIndex.value].key}`),
)

function goTo(i) {
  if (i === activeIndex.value) return
  isAnimating.value = true
  kenBurnsOn.value = false
  window.setTimeout(() => {
    activeIndex.value = i
    isAnimating.value = false
    requestAnimationFrame(() => {
      kenBurnsOn.value = true
    })
  }, 220)
}

function next() {
  goTo((activeIndex.value + 1) % slides.length)
}

onMounted(() => {
  timer = window.setInterval(next, 4200)
})

onUnmounted(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <section
    id="hero"
    class="relative isolate flex min-h-[32rem] items-center overflow-hidden bg-navy-950 pt-[5.75rem] text-white sm:min-h-[36rem] sm:pt-[6.25rem] lg:min-h-[34rem] lg:h-[62svh] lg:pt-28"
  >
    <div class="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
      <div
        v-for="(slide, i) in slides"
        :key="slide.key"
        class="absolute inset-0 transition-opacity duration-[1100ms] ease-in-out"
        :class="i === activeIndex ? 'opacity-100' : 'opacity-0'"
      >
        <img
          :src="slide.src"
          :alt="slide.alt"
          class="h-full w-full object-cover object-center"
          :class="i === activeIndex && kenBurnsOn ? 'hero-kenburns-active' : ''"
          decoding="async"
          :fetchpriority="i === 0 ? 'high' : 'low'"
        />
      </div>
    </div>

    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/55 via-navy-950/20 to-transparent"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-navy-950/45 to-transparent"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-navy-950/35 to-transparent"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 lg:px-8">
      <div class="max-w-xl rounded-md bg-navy-950/35 px-5 py-6 backdrop-blur-[2px] sm:px-6 sm:py-7">
        <p class="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
          {{ t('hero.title') }}
        </p>

        <h1 class="font-display text-3xl leading-relaxed tracking-wider text-white sm:text-4xl lg:text-5xl">
          <span class="block text-white">{{ t('hero.findPrefix') }}</span>
          <span
            class="mt-2 inline-block min-h-[1.2em] font-semibold text-accent-soft transition-all duration-300"
            :class="isAnimating ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'"
          >
            {{ activeCountry }}
          </span>
        </h1>

        <p class="mt-4 max-w-xl text-sm leading-[1.85] text-white/85 sm:text-base">
          {{ t('hero.subtitle') }}
        </p>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <RouterLink
            to="/#contact"
            class="inline-flex items-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition hover:bg-accent-soft"
          >
            {{ t('hero.cta') }}
          </RouterLink>
          <RouterLink
            to="/#services"
            class="inline-flex items-center rounded-md border border-white/40 bg-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/25"
          >
            {{ t('hero.secondary') }}
          </RouterLink>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5"
      aria-hidden="true"
    >
      <button
        v-for="(slide, i) in slides"
        :key="slide.key"
        type="button"
        class="h-1.5 rounded-full transition-all duration-500"
        :class="i === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/45'"
        :aria-label="slide.key"
        @click="goTo(i)"
      />
    </div>
  </section>
</template>

<style scoped>
.hero-kenburns-active {
  will-change: transform;
  animation: hero-kenburns 4.4s ease-out forwards;
}

@keyframes hero-kenburns {
  from {
    transform: scale(1.12) translate3d(1%, 0.3%, 0);
  }
  to {
    transform: scale(1.02) translate3d(0, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-kenburns-active {
    animation: none;
    transform: scale(1.02);
  }
}
</style>
