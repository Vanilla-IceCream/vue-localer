<script lang="ts" setup>
import useLocale from './locales';

const locale = useLocale();
</script>

<template>
  <div>{{ locale.description }}</div>
</template>
