<script lang="ts" setup>
import { useLocaler } from 'vue-localer';

import useLocale from './_locales';

const { f } = useLocaler();
const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Foo' }) }}</div>
  <div>{{ $f(locale.hello, { msg: 'Foo ($f)' }) }}</div>
</template>
