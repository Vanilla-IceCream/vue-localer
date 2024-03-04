import type { App, Ref } from 'vue';
import { ref, computed, reactive, watch, inject } from 'vue';
import mi from 'message-interpolation';

export {};

declare module 'vue' {
  interface ComponentCustomProperties {
    $f: typeof mi;
    $lang: Ref<string>;
    $langs: Ref<string[]>;
  }
}

type Locale = string;

interface CreateLocalerParams {
  fallbackLocale: string;
  messages: Record<Locale, any>;
}

const langSymbol = Symbol('lang');
const langsSymbol = Symbol('langs');
const localerSymbol = Symbol('localer');

export const createLocaler = ({ fallbackLocale, messages }: CreateLocalerParams) => {
  const lang = ref(fallbackLocale);
  const langs = ref(Object.keys(normalize(messages)));

  return {
    f: mi,
    lang,
    langs,
    install(app: App) {
      app.config.globalProperties.$f = mi;
      app.config.globalProperties.$lang = lang;
      app.config.globalProperties.$langs = langs;

      const localer = reactive({ fallbackLocale, messages: normalize(messages) });

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

      app.provide(langSymbol, lang);
      app.provide(langsSymbol, langs);
      app.provide(localerSymbol, localer);
    },
  };
};

export const useLocaler = () => {
  const lang = inject(langSymbol) as Ref<string>;
  const langs = inject(langsSymbol) as Ref<string[]>;
  const { fallbackLocale } = inject(localerSymbol) as CreateLocalerParams;

  return { f: mi, lang, langs, fallbackLocale } as {
    f: typeof mi;
    lang: Ref<string>;
    langs: Ref<string[]>;
    fallbackLocale: string;
  };
};

export const useLocale = <T extends Record<string, any>>() => {
  const lang = inject(langSymbol) as Ref<string>;
  const { fallbackLocale, messages } = inject(localerSymbol) as CreateLocalerParams;

  return computed<T>(() => {
    if (Object.keys(messages).includes(lang.value)) {
      return messages[lang.value];
    }

    return messages[fallbackLocale];
  });
};

export const defineLocale = <T extends Record<string, any>>(
  name: string,
  locales: Record<Locale, any>,
) => {
  const _locales = reactive(normalize(locales));

  return () => {
    const lang = inject(langSymbol) as Ref<string>;
    const { fallbackLocale } = inject(localerSymbol) as CreateLocalerParams;

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

    return computed<T>(() => {
      if (Object.keys(_locales).includes(lang.value)) {
        return _locales[lang.value];
      }

      return _locales[fallbackLocale];
    });
  };
};

export { default as Localer } from './Localer.vue';

function normalize(locales: Record<Locale, any>) {
  const normalized = Object.entries(locales).map(([key, val]) => [
    // @ts-ignore
    key.split('/').pop().split('.').slice(0, -1).join('.') || key,
    val,
  ]);

  return Object.fromEntries(normalized);
}
