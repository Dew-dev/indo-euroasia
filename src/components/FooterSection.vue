<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border bg-navy-950 text-white">
    <div class="mx-auto max-w-6xl px-5 py-14 lg:px-8">
      <div class="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p class="text-base font-bold tracking-wide">
            Indonesia Euroasia Pavilion
          </p>
          <p class="mt-3 max-w-sm text-sm leading-[1.85] text-white/65">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
            {{ t('nav.contact') }}
          </p>
          <a
            href="mailto:info@indo-euroasia.com"
            class="mt-4 block text-sm text-white/80 transition hover:text-white"
          >
            {{ t('footer.email') }}
          </a>
          <p class="mt-2 text-sm text-white/55">Indo-Euroasia.com</p>
        </div>

        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
            {{ t('footer.navigate') }}
          </p>
          <nav class="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
            <RouterLink to="/#about" class="transition hover:text-white">{{ t('nav.about') }}</RouterLink>
            <RouterLink to="/#services" class="transition hover:text-white">{{ t('nav.services') }}</RouterLink>
            <RouterLink to="/membership" class="transition hover:text-white">{{ t('nav.membership') }}</RouterLink>
            <RouterLink to="/#projects" class="transition hover:text-white">{{ t('nav.portfolio') }}</RouterLink>
            <RouterLink to="/projects/indonesia" class="transition hover:text-white">{{ t('nav.projectsIndonesia') }}</RouterLink>
            <RouterLink to="/projects/euroasia" class="transition hover:text-white">{{ t('nav.projectsEuroasia') }}</RouterLink>
            <RouterLink to="/#commodities" class="transition hover:text-white">{{ t('nav.commodities') }}</RouterLink>
            <RouterLink to="/#contact" class="transition hover:text-white">{{ t('nav.contact') }}</RouterLink>
          </nav>
        </div>
      </div>

      <div class="mt-12 border-t border-white/10 pt-6 text-xs text-white/40">
        <p>© {{ year }} Indonesia Euroasia Pavilion. {{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>
