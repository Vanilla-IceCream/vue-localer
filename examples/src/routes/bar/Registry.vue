<script lang="ts" setup>
import { useLocaler, Localer } from 'vue-localer';

import useLocale from './_locales';
import Child from './_includes/Child.vue';

const { f } = useLocaler();
const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Bar' }) }}</div>
  <Child />

  <div>
    <Localer :message="locale.term">
      <template #licenseAgreement>
        <a href="javascript: void 0">{{ locale.licenseAgreement }}</a>
      </template>

      <template #tos>
        <a href="javascript: void 0">{{ locale.tos }}</a>
      </template>
    </Localer>
  </div>
</template>
