# vue-localer

Internationalization plugin for Vue.

## Install

```sh
$ npm i vue-localer
# or
$ yarn add vue-localer
# or
$ pnpm i vue-localer
# or
$ bun add vue-localer
```

## Usage

First, prepare the multilingual files.

```ts
// src/locales/en-US.ts
export default {
  hello: `Hello, {msg}!`,
  world: `Hello, World!`,
};

// src/locales/ja-JP.ts
export default {
  hello: `こんにちは、{msg}!`,
  world: `こんにちは、世界！`,
};

// src/locales/ko-KR.ts
export default {
  hello: `안녕하세요, {msg}!`,
  world: `안녕하세요, 월드!`,
};
```

Instantiate `vue-localer` and load multiple language files.

```ts
// src/plugins/localer.ts
import { createLocaler } from 'vue-localer';

import enUS from '~/locales/en-US';

export default createLocaler({
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'ja-JP': () => import('~/locales/ja-JP'),
    'ko-KR': () => import('~/locales/ko-KR'),
  },
});
```

Register the instantiated `vue-localer` as app-level functionality to Vue.

```ts
// src/main.ts
import { createApp } from 'vue';

import localer from '~/plugins/localer';

import App from './App.vue';

const app = createApp(App);

app.use(localer);

app.mount('#root');
```

Next, by using `useLocale`, you can obtain the source of the current locale.

```vue
<script lang="ts" setup>
import { useLocaler, useLocale } from 'vue-localer';

const { f } = useLocaler();
const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Vue' }) }}</div>
  <div>{{ locale.world }}</div>
</template>
```

## Documentation

To learn more about `vue-localer`, check [its documentation](https://vitesheet.onrender.com/vue-localer/).
