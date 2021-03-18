import { inject, computed } from 'vue';
import { Store } from 'vuex';
import mi from 'message-interpolation';

export const i18nKey = 'i18n';

const injectLanguage = (state, { lang, locale }) => {
  state.lang = lang;
  state.locale = locale;
};

export function createLocaler({ data, methods }) {
  return new I18n({
    state: data,
    mutations: { injectLanguage },
    actions: methods,
  });
}

export function useLocaler() {
  return inject(i18nKey);
}

export function useLang() {
  const localer = useLocaler();
  const lang = computed(() => localer.state.lang);
  return lang;
}

export function useLocale(mod) {
  const localer = useLocaler();

  let locale = computed(() => localer.state.locale);
  // TODO: nested
  if (mod) locale = computed(() => localer.state[mod].locale);

  return locale;
}

export class I18n extends Store {
  install(app, injectKey) {
    app.provide(i18nKey, this);
    app.config.globalProperties.$i18n = this;
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
