<script lang="ts" setup>
import { computed, useSlots, h } from 'vue';

const props = defineProps<{ message: string }>();

const slots = useSlots();

const matcher = /{([^}]+)?}/gm;

const matchedKeys = computed(() => {
  return props.message?.match(matcher)?.map((s) => s.slice(1, s.length - 1));
});

const VNode = () => {
  const el = props.message?.split(matcher);
  const keys = matchedKeys.value || [];

  return el?.map((item) => {
    if (keys.includes(item)) {
      return h('span', slots[item]?.());
    }

    return h('span', null, item);
  });
};
</script>

<template>
  <VNode />
</template>
