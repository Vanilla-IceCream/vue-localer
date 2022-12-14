<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router';
import { useLocale } from 'vue-localer';

const locale = useLocale();
</script>

<template>
  <div>{{ $f(locale.hello, { msg: 'Vue' }) }}</div>

  <ul>
    <li>
      <RouterLink to="/foo">Foo</RouterLink>
    </li>
    <li>
      <RouterLink to="/bar">Bar</RouterLink>
    </li>
  </ul>

  <RouterView />
</template>
