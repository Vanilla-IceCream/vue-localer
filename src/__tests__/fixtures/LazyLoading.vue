<script lang="ts" setup>
import { useLocaler, defineLocale } from '../../vue-localer';

const useLocale = defineLocale('local-scope', {
  en: { hello: `Hello, {msg}!` },
  ja: () => import('./ja'),
});

const { lang } = useLocaler();
const locale = useLocale();

lang.value = 'ja';
</script>

<template>
  <div>{{ $f(locale.hello, { msg: '世界' }) }}</div>
</template>
