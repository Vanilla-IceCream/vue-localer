# Vue Localer

Internationalization for Vue.

## Install

```sh
$ npm i vue-localer -S
# or
$ yarn add vue-localer
# or
$ pnpm i vue-localer -S
```

## Usage

```js
// src/core/localer.js
import { createLocaler } from '~/vue-localer';

import { router } from './router';
import enUS from '~/locales/en-US';

export const langList = {
  'en-US': 'American English',
  'ja-JP': '日本語',
  'zh-TW': '正體中文',
};

export const getUserLang = () => {
  const langListKeys = Object.keys(langList);

  if (langListKeys.includes(navigator.language)) {
    return navigator.language;
  }

  return 'en-US';
};

function camelToHyphen(str) {
  return str.replace(/([A-Z])/g, (match) => '-' + match.toLowerCase());
}

let hyphenedMod = '';

export const localer = createLocaler({
  data: {
    lang: 'en-US',
    locale: enUS,
  },
  methods: {
    async initialLanguage({ commit }, mod) {
      const lang = localStorage.getItem('lang') || getUserLang();
      document.documentElement.lang = lang;
      const response = await import(`../locales/${lang}.js`);
      commit('injectLanguage', { lang, locale: response.default });

      if (mod) {
        hyphenedMod = camelToHyphen(mod);
        const res = await import(`../modules/${hyphenedMod}/locales/${lang}.js`);
        commit(`${mod}/injectLanguage`, { locale: res.default });
      }
    },
    async setLanguage({ commit }, lang) {
      document.documentElement.lang = lang;
      localStorage.setItem('lang', lang);
      const response = await import(`../locales/${lang}.js`);
      commit('injectLanguage', { lang, locale: response.default });

      if (router.currentRoute.value.name !== 'home') {
        let mod = router.currentRoute.value.name.split('/')[0];
        const res = await import(`../modules/${hyphenedMod}/locales/${lang}.js`);
        commit(`${mod}/injectLanguage`, { locale: res.default });
      }
    },
  },
});
```

### Global Scope

```vue
<script setup>
import { useLocaler, useLocale } from 'vue-localer';

const localer = useLocaler();
const locale = useLocale();

function changeLang(event) {
  localer.dispatch('setLanguage', event.target.value);
}
</script>

<template>
  <div>
    <div>{{ locale.title }}</div>

    <select :value="localer.state.lang" @change="changeLang" name="lang" id="lang">
      <option value="en-US">American English</option>
      <option value="ja-JP">日本語</option>
      <option value="zh-TW">正體中文</option>
    </select>
  </div>

  <router-link :to="{ name: 'helloWorld' }">Hello World</router-link>
</template>
```

### Local Scope

```vue
<script setup>
import { useLocaler, useLocale } from '~/vue-localer';

import enUS from './locales/en-US.js';

const localer = useLocaler();
const locale = useLocale('helloWorld');

if (!localer.hasModule('helloWorld')) {
  localer.register('helloWorld', { locale: enUS });
}

localer.dispatch('initialLanguage', 'helloWorld');
</script>

<template>
  <div>{{ locale.msg }}</div>
  <div>{{ $f(locale.say, { msg: 'Vue' }) }}</div>
</template>
```

## Example

See [Vue-Starter](https://github.com/Shyam-Chen/Vue-Starter).
