<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router';
import { useLocaler, useLocale } from 'vue-localer';

const localer = useLocaler();
const locale = useLocale();
</script>

<template>
  <label for="languages">Language:</label>

  <select name="languages" id="languages" v-model="localer.lang.value">
    <option value="en-US">en-US</option>
    <option value="ja-JP">ja-JP</option>
    <option value="ko-KR">ko-KR (lazy)</option>
    <option value="zh-TW">zh-TW (undefined)</option>
  </select>

  <div>Current Language: {{ localer.lang.value }}</div>
  <div>Available Locales: {{ localer.langs.value }}</div>

  <div>{{ $f(locale.hello, { msg: 'Vue' }) }}</div>

  <ul>
    <li>
      <RouterLink to="/foo">Foo</RouterLink>
    </li>
    <li>
      <RouterLink to="/bar">Bar</RouterLink>
    </li>
    <li>
      <RouterLink to="/baz">Baz</RouterLink>
    </li>
    <li>
      <RouterLink to="/glob">Glob</RouterLink>
    </li>
  </ul>

  <RouterView />
</template>
