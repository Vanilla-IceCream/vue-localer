<script lang="ts" setup>
import { useLocaler } from 'vue-localer';

import useLocale from './_locales';
import Child from './_includes/Child.vue';

const { f } = useLocaler();
const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Bar' }) }}</div>
  <Child />
</template>
