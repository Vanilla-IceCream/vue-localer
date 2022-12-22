import type { App, Ref } from 'vue';
import { ref, computed, reactive, watch, inject } from 'vue';
import mi from 'message-interpolation';

export {};

declare module 'vue' {
  interface ComponentCustomProperties {
    $f: typeof mi;
  }
}

interface CreateLocalerParams {
  fallbackLocale: string;
  messages: Record<string, any>;
}

export const createLocaler = ({ fallbackLocale, messages }: CreateLocalerParams) => {
  return {
    install(app: App) {
      app.config.globalProperties.$f = mi;

      const lang = ref(fallbackLocale);
      const localer = reactive({ fallbackLocale, messages });

      watch(
        () => lang.value,
        (curLang) => {
          Object.entries(localer.messages).forEach(async (message) => {
            if (message[0].startsWith(curLang) && typeof message[1] === 'function') {
              const { default: curMsg } = await message[1]();

              localer.messages[message[0]] = curMsg;
            }
          });
        },
        { immediate: true },
      );

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

    const _locales = reactive(locales);

    watch(
      () => lang.value,
      (curLang) => {
        Object.entries(_locales).forEach(async (message) => {
          if (message[0].startsWith(curLang) && typeof message[1] === 'function') {
            const { default: curMsg } = await message[1]();
            _locales[message[0]] = curMsg;
          }
        });
      },
      { immediate: true },
    );

    return computed(() => {
      if (Object.keys(_locales).includes(lang.value)) {
        return _locales[lang.value];
      }

      return _locales[fallbackLocale];
    });
  };
};

export const useLocale = () => {
  const lang = inject('vue-localer:lang') as any;
  const { fallbackLocale, messages } = inject('vue-localer') as any;

  return computed(() => {
    if (Object.keys(messages).includes(lang.value)) {
      return messages[lang.value];
    }

    return messages[fallbackLocale];
  });
};

export { default as Localer } from './Localer.vue';
