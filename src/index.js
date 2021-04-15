import { inject, computed } from 'vue';
import { Store } from 'vuex';
import mi from 'message-interpolation';

export const localerKey = 'localer';

const injectLanguage = (state, { lang, locale }) => {
  if (lang) state.lang = lang;
  state.locale = locale;
};

export function createLocaler({ data, methods }) {
  return new Localer({
    state: data,
    mutations: { injectLanguage },
    actions: methods,
  });
}

export function useLocaler() {
  return inject(localerKey);
}

export function useLang() {
  const localer = useLocaler();
  const lang = computed(() => localer.state.lang);
  return lang;
}

export function useLocale(mod) {
  const localer = useLocaler();

  let locale = computed(() => localer.state.locale);
  if (mod) locale = computed(() => localer.state[mod].locale);

  return locale;
}

export class Localer extends Store {
  install(app, injectKey) {
    app.provide(injectKey || localerKey, this);
    app.config.globalProperties.$localer = this;
    app.config.globalProperties.$f = mi;
  }

  register(path, locale) {
    this.registerModule(path, {
      namespaced: true,
      state: { locale },
      mutations: { injectLanguage },
    });
  }
}
