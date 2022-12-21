# vue-localer

Internationalization plugin for Vue.

## Install

```sh
$ pnpm i vue-localer
# or
$ yarn add vue-localer
# or
$ npm i vue-localer
# or
$ bun add vue-localer
```

## Usage

```ts
import { createLocaler, useLocaler, defineLocale, useLocale, Localer } from 'vue-localer';
```

```ts
// src/plugins/localer.ts
import { createLocaler } from 'vue-localer';

import enUS from '~/locales/en-US';
import jaJP from '~/locales/ja-JP';

// lang <- localStorage.getItem('language') || fallbackLocale

export default createLocaler({
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'ja-JP': jaJP,
    'ko-KR': () => import('~/locales/ko-KR'),
  },
});
```

```ts
// src/main.ts
import { createApp } from 'vue';

import router from '~/plugins/router';
import localer from '~/plugins/localer';

import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(localer);

app.mount('#root');
```

## Locale Changing

```vue
<script lang="ts" setup>
import { useLocaler } from 'vue-localer';

const localer = useLocaler();
</script>

<template>
  <label for="languages">Language:</label>

  <select id="languages" v-model="localer.lang.value" name="languages">
    <option value="en-US">en-US</option>
    <option value="ja-JP">ja-JP</option>
    <option value="ko-KR">ko-KR (lazy)</option>
    <option value="zh-TW">zh-TW (undefined)</option>
  </select>

  <div>{{ localer.lang.value }}</div>
</template>
```

## Format Syntax

```vue
<!-- src/App.vue -->
<script lang="ts" setup>
import { useLocale } from 'vue-localer';

const locale = useLocale();
</script>

<template>
  <div>{{ $f(locale.hello, { msg: 'Vue' }) }}</div>
</template>

<!-- or -->

<script lang="ts" setup>
import { useLocaler, useLocale } from 'vue-localer';

const { f } = useLocaler();
const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Vue' }) }}</div>
</template>
```

## Local Scope

```ts
import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/foo', component: () => import('~/routes/foo/Registry.vue') }],
});
```

```vue
// src/routes/foo/Registry.vue
<script lang="ts" setup>
import { useLocaler, defineLocale } from 'vue-localer';

import enUS from './_locales/en-US';
import jaJP from './_locales/ja-JP';

const { f } = useLocaler();

const useLocale = defineLocale('foo', {
  'en-US': enUS,
  'ja-JP': jaJP,
  'ko-KR': () => import('./_locales/ko-KR'),
});

const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Vue' }) }}</div>
</template>
```

Shared

```ts
// src/routes/foo/_locales/index.ts
import { defineLocale } from 'vue-localer';

import enUS from './en-US';
import jaJP from './ja-JP';

export default defineLocale('foo', {
  'en-US': enUS,
  'ja-JP': jaJP,
  'ko-KR': () => import('./ko-KR'),
});
```

```vue
// src/routes/foo/Registry.vue
<script lang="ts" setup>
import { useLocaler } from 'vue-localer';

import useLocale from './_locales';

const { f } = useLocaler();
const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Vue' }) }}</div>
</template>
```

## List interpolation

The List interpolation can be interpolated in the placeholder using an array defined in JavaScript.

As an example, the following locale messages resource:

```ts
// src/locales/en-US.ts
export default {
  hello: '{0} world',
};
```

It is defined `en-US` locale with `{ hello: '{0} world' }`.

List interpolation allows you to specify array defined in JavaScript. In the locale message above, you can be localized by giving the `0` index item of the array defined by JavaScript as a parameter to the translation function.

The following is an example of the use of `$f` in a template:

```vue
<script setup>
import { useLocale } from 'vue-localer';

const locale = useLocale();
</script>

<template>
  <div>{{ $f(locale.hello, ['hello']) }}</div>
</template>
```

The first argument is `locale.hello` as the locale messages key, and the second argument is an array that have `'hello'` item as a parameter to `$f`.

As result the below:

```html
<div>hello world</div>
```

## Component interpolation

Messages:

```ts
export default {
  term: `I have read and agree to the {licenseAgreement}.`,
  licenseAgreement: 'License Agreement',
};

export default {
  term: `{licenseAgreement}を読み、同意します。`,
  licenseAgreement: 'ライセンス契約',
};
```

Template:

```vue
<script setup>
import { useLocale, Localer } from 'vue-localer';

const locale = useLocale();
</script>

<template>
  <Localer :message="locale.term">
    <template #licenseAgreement>
      <a href="https://...">{{ locale.licenseAgreement }}</a>
    </template>
  </Localer>
</template>
```

Output:

```html
<span>I have read and agree to the </span><span><a href="https://...">License Agreement</a></span
><span>.</span>

<span><a href="https://...">ライセンス契約</a></span
><span>を読み、同意します。</span>
```
