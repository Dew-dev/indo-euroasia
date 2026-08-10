<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t, locale } = useI18n()
const route = useRoute()

const scrolled = ref(false)
const mobileOpen = ref(false)
const langOpen = ref(false)
const portfolioOpen = ref(false)

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'id', label: 'ID' },
  { code: 'ru', label: 'RU' },
]

const currentLang = computed(
  () => languages.find((l) => l.code === locale.value)?.label || 'EN',
)

const isHome = computed(() => route.path === '/')
const onDarkHero = computed(() => isHome.value && !scrolled.value && !mobileOpen.value)

const portfolioChildren = computed(() => [
  { to: '/projects/indonesia', label: t('nav.projectsIndonesia') },
  { to: '/projects/euroasia', label: t('nav.projectsEuroasia') },
])

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function setLocale(code) {
  locale.value = code
  localStorage.setItem('locale', code)
  langOpen.value = false
}

function closeMenus() {
  mobileOpen.value = false
  langOpen.value = false
  portfolioOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="
      scrolled || mobileOpen || !isHome
        ? 'border-b border-border bg-white/95 shadow-sm backdrop-blur-md'
        : 'bg-transparent'
    "
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
      <RouterLink
        to="/"
        class="flex shrink-0 items-center gap-2.5"
        @click="closeMenus"
      >
        <img
          src="/images/logo-indo-euroasia-mark.png"
          alt=""
          class="h-10 w-auto object-contain sm:h-11"
          width="56"
          height="44"
          aria-hidden="true"
        />
        <span
          class="hidden max-w-[11rem] text-[13px] font-bold leading-snug tracking-wide sm:block"
          :class="onDarkHero ? 'text-white' : 'text-navy-900'"
        >
          Indonesia Euroasia Pavilion
        </span>
        <span class="sr-only">Indonesia Euroasia Pavilion</span>
      </RouterLink>

      <nav class="hidden items-center gap-7 lg:flex">
        <RouterLink
          to="/#about"
          class="text-[13px] font-medium transition-colors"
          :class="onDarkHero ? 'text-white/75 hover:text-white' : 'text-slate-muted hover:text-navy-900'"
        >
          {{ t('nav.about') }}
        </RouterLink>

        <RouterLink
          to="/#services"
          class="text-[13px] font-medium transition-colors"
          :class="onDarkHero ? 'text-white/75 hover:text-white' : 'text-slate-muted hover:text-navy-900'"
        >
          {{ t('nav.services') }}
        </RouterLink>

        <div
          class="relative"
          @mouseenter="portfolioOpen = true"
          @mouseleave="portfolioOpen = false"
        >
          <button
            type="button"
            class="inline-flex items-center gap-1 text-[13px] font-medium transition-colors"
            :class="onDarkHero ? 'text-white/75 hover:text-white' : 'text-slate-muted hover:text-navy-900'"
            :aria-expanded="portfolioOpen"
            @click="portfolioOpen = !portfolioOpen"
          >
            {{ t('nav.portfolio') }}
            <svg class="h-3.5 w-3.5 opacity-60" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
          <div
            v-if="portfolioOpen"
            class="absolute left-0 top-full pt-2"
          >
            <ul class="min-w-[200px] overflow-hidden rounded-md border border-border bg-white py-1 shadow-lg">
              <li v-for="child in portfolioChildren" :key="child.to">
                <RouterLink
                  :to="child.to"
                  class="block px-4 py-2.5 text-[13px] font-medium text-slate-muted transition hover:bg-surface hover:text-navy-900"
                  @click="closeMenus"
                >
                  {{ child.label }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <RouterLink
          to="/#commodities"
          class="text-[13px] font-medium transition-colors"
          :class="onDarkHero ? 'text-white/75 hover:text-white' : 'text-slate-muted hover:text-navy-900'"
        >
          {{ t('nav.commodities') }}
        </RouterLink>

        <RouterLink
          to="/membership"
          class="text-[13px] font-medium transition-colors"
          :class="onDarkHero ? 'text-white/75 hover:text-white' : 'text-slate-muted hover:text-navy-900'"
        >
          {{ t('nav.membership') }}
        </RouterLink>

        <RouterLink
          to="/#contact"
          class="text-[13px] font-medium transition-colors"
          :class="onDarkHero ? 'text-white/75 hover:text-white' : 'text-slate-muted hover:text-navy-900'"
        >
          {{ t('nav.contact') }}
        </RouterLink>
      </nav>

      <div class="hidden items-center gap-3 lg:flex">
        <div class="relative">
          <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-[13px] font-semibold transition"
            :class="
              onDarkHero
                ? 'border-white/25 text-white hover:bg-white/10'
                : 'border-border text-navy-900 hover:bg-surface'
            "
            :aria-expanded="langOpen"
            @click="langOpen = !langOpen"
          >
            {{ currentLang }}
            <svg class="h-3.5 w-3.5 opacity-60" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
          <ul
            v-if="langOpen"
            class="absolute right-0 mt-2 min-w-[88px] overflow-hidden rounded-md border border-border bg-white py-1 shadow-lg"
          >
            <li v-for="lang in languages" :key="lang.code">
              <button
                type="button"
                class="block w-full px-3 py-2 text-left text-[13px] font-medium transition hover:bg-surface"
                :class="locale === lang.code ? 'text-navy-900' : 'text-slate-muted'"
                @click="setLocale(lang.code)"
              >
                {{ lang.label }}
              </button>
            </li>
          </ul>
        </div>

        <RouterLink
          to="/#contact"
          class="inline-flex items-center rounded-md px-4 py-2.5 text-[13px] font-semibold transition"
          :class="
            onDarkHero
              ? 'bg-white text-navy-900 hover:bg-accent-soft'
              : 'bg-navy-900 text-white hover:bg-navy-800'
          "
        >
          {{ t('nav.cta') }}
        </RouterLink>
      </div>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-md border transition lg:hidden"
        :class="onDarkHero ? 'border-white/25 text-white' : 'border-border text-navy-900'"
        :aria-expanded="mobileOpen"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <svg v-if="!mobileOpen" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <div v-if="mobileOpen" class="border-t border-border bg-white px-5 py-5 lg:hidden">
      <nav class="flex flex-col gap-1">
        <RouterLink to="/#about" class="rounded-md px-3 py-2.5 text-sm font-medium text-slate-ink hover:bg-surface" @click="closeMenus">
          {{ t('nav.about') }}
        </RouterLink>
        <RouterLink to="/#services" class="rounded-md px-3 py-2.5 text-sm font-medium text-slate-ink hover:bg-surface" @click="closeMenus">
          {{ t('nav.services') }}
        </RouterLink>
        <p class="px-3 pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-muted">
          {{ t('nav.portfolio') }}
        </p>
        <RouterLink
          v-for="child in portfolioChildren"
          :key="child.to"
          :to="child.to"
          class="rounded-md px-3 py-2.5 pl-5 text-sm font-medium text-slate-ink hover:bg-surface"
          @click="closeMenus"
        >
          {{ child.label }}
        </RouterLink>
        <RouterLink to="/#commodities" class="rounded-md px-3 py-2.5 text-sm font-medium text-slate-ink hover:bg-surface" @click="closeMenus">
          {{ t('nav.commodities') }}
        </RouterLink>
        <RouterLink to="/membership" class="rounded-md px-3 py-2.5 text-sm font-medium text-slate-ink hover:bg-surface" @click="closeMenus">
          {{ t('nav.membership') }}
        </RouterLink>
        <RouterLink to="/#contact" class="rounded-md px-3 py-2.5 text-sm font-medium text-slate-ink hover:bg-surface" @click="closeMenus">
          {{ t('nav.contact') }}
        </RouterLink>
      </nav>
      <div class="mt-4 flex items-center gap-2">
        <button
          v-for="lang in languages"
          :key="lang.code"
          type="button"
          class="rounded-md border px-3 py-2 text-xs font-semibold"
          :class="locale === lang.code ? 'border-navy-900 bg-navy-900 text-white' : 'border-border text-slate-muted'"
          @click="setLocale(lang.code)"
        >
          {{ lang.label }}
        </button>
      </div>
      <RouterLink
        to="/#contact"
        class="mt-4 flex items-center justify-center rounded-md bg-navy-900 px-4 py-3 text-sm font-semibold text-white"
        @click="closeMenus"
      >
        {{ t('nav.cta') }}
      </RouterLink>
    </div>
  </header>
</template>
