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
import enUS from '~/locales/en-US';

export default createLocaler({
  // locale <- localStorage.getItem('language') || navigator.language
  fallbackLocale: 'en-US',
  messages: {
    'en-US': {
      hello: `Hello, {msg}!`,
    },
    'ja-JP': {
      hello: `こんにちは、{msg}!`,
    },
  },
});
```

```vue
<script lang="ts" setup>
import { useLocaler } from 'vue-localer';

const { locale } = useLocaler();

locale.value = 'ja-JP';
</script>
```

```vue
<script lang="ts" setup>
import { useLocale } from 'vue-localer';

const locale = useLocale();
</script>

<template>
  <div>{{ $f(locale.hello, { msg: 'Vue' }) }}</div>
</template>
```

```ts
import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/foo', component: () => import('~/routes/foo/Registry.vue') },
  ],
});
```

```vue
// src/routes/foo/Registry.vue
<script lang="ts" setup>
import { useLocaler, useLocale } from 'vue-localer';

import { Child } from './_includes/Child.vue';

const { f } = useLocaler();

const locale = useLocale('foo');
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Vue' }) }}</div>
  <Child />
</template>

<localer src="./_locales/en-US.ts" locale="en-US" name="foo"></localer>
<localer src="./_locales/ja-JP.ts" locale="ja-JP" name="foo"></localer>
```

```vue
// src/routes/foo/_includes/Child.vue
<script lang="ts" setup>
import { useLocaler, useLocale } from 'vue-localer';

const { f } = useLocaler();

const locale = useLocale('foo');
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Vue' }) }}</div>
</template>
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
});

const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Vue' }) }}</div>
</template>
```

```vue
// src/routes/foo/Registry.vue
<script lang="ts" setup>
import { useLocaler, defineLocale } from 'vue-localer';

import useLocale from './_locales';

const { f } = useLocaler();
const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Vue' }) }}</div>
</template>
```
