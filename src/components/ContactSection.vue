<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const status = ref('idle')
const feedback = ref('')

async function onSubmit() {
  status.value = 'sending'
  feedback.value = ''

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form }),
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Request failed')
    }

    status.value = 'success'
    feedback.value = t('contact.success')
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch {
    status.value = 'error'
    feedback.value = t('contact.error')
  }
}
</script>

<template>
  <section id="contact" class="bg-white py-24 lg:py-28">
    <div class="mx-auto max-w-6xl px-5 lg:px-8">
      <div class="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {{ t('contact.title') }}
          </p>
          <h2 class="mt-3 font-display text-4xl tracking-wider text-navy-900 sm:text-5xl">
            {{ t('contact.title') }}
          </h2>
          <p class="mt-6 text-base leading-[1.85] text-slate-muted">
            {{ t('contact.lead') }}
          </p>
          <div class="mt-8 space-y-3 text-sm">
            <a
              href="mailto:info@indo-euroasia.com"
              class="block font-medium text-navy-900 transition hover:text-navy-700"
            >
              info@indo-euroasia.com
            </a>
            <p class="text-slate-muted">Indo-Euroasia.com</p>
          </div>
        </div>

        <form class="space-y-5" @submit.prevent="onSubmit">
          <div class="grid gap-5 sm:grid-cols-2">
            <label class="block">
              <span class="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-muted">
                {{ t('contact.name') }}
              </span>
              <input
                v-model="form.name"
                type="text"
                required
                :placeholder="t('contact.namePlaceholder')"
                class="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-muted/60 focus:border-navy-800"
              />
            </label>
            <label class="block">
              <span class="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-muted">
                {{ t('contact.email') }}
              </span>
              <input
                v-model="form.email"
                type="email"
                required
                :placeholder="t('contact.emailPlaceholder')"
                class="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-muted/60 focus:border-navy-800"
              />
            </label>
          </div>

          <label class="block">
            <span class="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-muted">
              {{ t('contact.subject') }}
            </span>
            <input
              v-model="form.subject"
              type="text"
              required
              :placeholder="t('contact.subjectPlaceholder')"
              class="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-muted/60 focus:border-navy-800"
            />
          </label>

          <label class="block">
            <span class="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-muted">
              {{ t('contact.message') }}
            </span>
            <textarea
              v-model="form.message"
              required
              rows="5"
              :placeholder="t('contact.messagePlaceholder')"
              class="w-full resize-y rounded-md border border-border bg-white px-4 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-muted/60 focus:border-navy-800"
            />
          </label>

          <div class="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              class="inline-flex items-center rounded-md bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="status === 'sending'"
            >
              {{ status === 'sending' ? t('contact.sending') : t('contact.submit') }}
            </button>
            <p
              v-if="feedback"
              class="text-sm"
              :class="status === 'success' ? 'text-emerald-700' : 'text-red-700'"
            >
              {{ feedback }}
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
