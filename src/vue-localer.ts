import type { App } from 'vue';
import { ref, computed, reactive, inject } from 'vue';
import mi from 'message-interpolation';

export const createLocaler = ({ fallbackLocale, messages }: any) => {
  return {
    install(app: App) {
      app.config.globalProperties.$f = mi;

      const locale = ref(localStorage.getItem('language') || navigator.language || fallbackLocale);

      const localer = reactive({
        fallbackLocale,
        messages,
      });

      app.provide('vue-localer:locale', locale);
      app.provide('vue-localer', localer);
    },
  };
};

export const useLocaler = () => {
  const locale = inject('vue-localer:locale') as any;
  const { fallbackLocale } = inject('vue-localer') as any;

  return { f: mi, locale, fallbackLocale } as any;
};

export const defineLocale = (name: string, locales: any) => {
  return () => {
    const locale = inject('vue-localer:locale') as any;
    const { fallbackLocale } = inject('vue-localer') as any;

    return computed(() => locales[locale.value || fallbackLocale]);
  };
};

export const useLocale = () => {
  const locale = inject('vue-localer:locale') as any;
  const { fallbackLocale, messages } = inject('vue-localer') as any;

  return computed(() => messages[locale.value || fallbackLocale]);
};

export { default as Localer } from './Localer.vue';
