<script lang="ts" setup>
import { useLocaler, useLocale } from '../vue-localer';

const { f } = useLocaler();
const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'World' }) }}</div>
</template>
