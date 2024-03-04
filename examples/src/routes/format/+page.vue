<script lang="ts" setup>
import { useLocaler } from 'vue-localer';

import useLocale from './locales';

const { f } = useLocaler();
const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Vue' }) }}</div>
  <div>{{ $f(locale.hello, { msg: 'Vue ($f)' }) }}</div>
</template>
