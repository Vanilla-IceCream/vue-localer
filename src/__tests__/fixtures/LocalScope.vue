<script lang="ts" setup>
import { defineLocale } from '../../vue-localer';

const useLocale = defineLocale('local-scope', {
  en: { hello: `Hello, {msg}!` },
  ja: { hello: `こんにちは、{msg}!` },
});

const locale = useLocale();
</script>

<template>
  <div>{{ $f(locale.hello, { msg: 'World' }) }}</div>
</template>
