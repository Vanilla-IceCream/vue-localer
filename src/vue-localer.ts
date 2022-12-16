import type { App, Ref } from 'vue';
import { ref, computed, reactive, inject } from 'vue';
import mi from 'message-interpolation';

export {};

declare module 'vue' {
  interface ComponentCustomProperties {
    $f: typeof mi;
  }
}

export const createLocaler = ({ fallbackLocale, messages }: any) => {
  return {
    install(app: App) {
      app.config.globalProperties.$f = mi;

      const lang = ref(localStorage.getItem('language') || navigator.language || fallbackLocale);

      const localer = reactive({
        fallbackLocale,
        messages,
      });

      app.provide('vue-localer:lang', lang);
      app.provide('vue-localer', localer);
    },
  };
};

export const useLocaler = () => {
  const lang = inject('vue-localer:lang') as Ref<string>;
  const { fallbackLocale } = inject('vue-localer') as { fallbackLocale: string };

  return { f: mi, lang, fallbackLocale } as {
    f: typeof mi;
    lang: Ref<string>;
    fallbackLocale: string;
  };
};

export const defineLocale = (name: string, locales: any) => {
  return () => {
    const lang = inject('vue-localer:lang') as any;
    const { fallbackLocale } = inject('vue-localer') as any;

    return computed(() => locales[lang.value || fallbackLocale]);
  };
};

export const useLocale = () => {
  const lang = inject('vue-localer:lang') as any;
  const { fallbackLocale, messages } = inject('vue-localer') as any;

  return computed(() => messages[lang.value || fallbackLocale]);
};

export { default as Localer } from './Localer.vue';
