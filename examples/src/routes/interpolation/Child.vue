<script lang="ts" setup>
import { useLocaler } from 'vue-localer';

import useLocale from './locales';

const { f } = useLocaler();
const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Child' }) }}</div>
</template>
