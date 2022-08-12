# Vue Localer

Internationalization for Vue.

### Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Getting Started](#getting-started)
- [Format Syntax](#format-syntax)
- [Example](#example)

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
import { createLocaler, useLocaler, useLang, useLocale } from 'vue-localer';
```

```js
// src/localer.js
import { createLocaler } from 'vue-localer';

import enUS from './locales/en-US.js';

export const localer = createLocaler({
  data: {
    lang: 'en-US',
    locale: enUS,
  },
  methods: {
    async initialLanguage({ commit }, mod) {},
    async setLanguage({ commit }, lang) {},
  },
});
```

```js
// src/main.js
import { createApp } from 'vue';

import { localer } from './localer.js';
import App from './App.vue';

const app = createApp(App);
app.use(localer);
app.mount('#root');
```

## Getting Started

```js
// src/core/localer.js
import { createLocaler } from 'vue-localer';

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
      const res = await import(`../locales/${lang}.js`);
      commit('injectLanguage', { lang, locale: res.default });

      if (mod) {
        hyphenedMod = camelToHyphen(mod);
        const modRes = await import(`../modules/${hyphenedMod}/locales/${lang}.js`);
        commit(`${mod}/injectLanguage`, { locale: modRes.default });
      }
    },
    async setLanguage({ commit }, lang) {
      document.documentElement.lang = lang;
      localStorage.setItem('lang', lang);
      const res = await import(`../locales/${lang}.js`);
      commit('injectLanguage', { lang, locale: res.default });

      if (router.currentRoute.value.name !== 'home') {
        let mod = router.currentRoute.value.name.split('/')[0];
        const modRes = await import(`../modules/${hyphenedMod}/locales/${lang}.js`);
        commit(`${mod}/injectLanguage`, { locale: modRes.default });
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
const lang = useLang();
const locale = useLocale();

localer.dispatch('initialLanguage');

function changeLang(event) {
  localer.dispatch('setLanguage', event.target.value);
}
</script>

<template>
  <div>
    <div>{{ locale.title }}</div>

    <select :value="lang" @change="changeLang" name="lang">
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
import { useLocaler, useLocale } from 'vue-localer';

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

## Format Syntax

### Named interpolation

Messages:

```js
export default {
  say: `Hello, {msg}!`,
};
```

Template:

```vue
<script setup>
import { useLocale } from 'vue-localer';

const locale = useLocale();
</script>

<template>
  <div>{{ $f(locale.say, { msg: 'Vue' }) }}</div>
</template>
```

Output:

```html
<div>Hello, Vue!</div>
```

### List interpolation

Messages:

```js
export default {
  say: `Hello, {0}!`,
};
```

Template:

```vue
<script setup>
import { useLocale } from 'vue-localer';

const locale = useLocale();
</script>

<template>
  <div>{{ $f(locale.say, ['Vue']) }}</div>
</template>
```

Output:

```html
<div>Hello, Vue!</div>
```

### Component interpolation

TODO:

Messages:

```js
export default {
  term: `I have read and agree to the {licenseAgreement}.`,
  licenseAgreement: 'License Agreement',
};

export default {
  term: `{licenseAgreement}に同意します。`,
  licenseAgreement: '使用許諾契約書',
};
```

```vue
<script setup>
import { useLocale, Locale } from 'vue-localer';

const locale = useLocale();
</script>

<template>
  <Locale :message="locale.term">
    <template #licenseAgreement>
      <a href="https://...">{{ $f(locale.licenseAgreement) }}</a>
    </template>
  </Locale>
</template>
```

Output:

```html
<div>I have read and agree to the <a href="https://...">License Agreement</a>.</div>

<div><a href="https://...">使用許諾契約書</a>に同意します。</div>
```

## Example

See [Vue-Starter](https://github.com/Shyam-Chen/Vue-Starter).
