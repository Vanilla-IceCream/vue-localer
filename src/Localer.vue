<script lang="ts" setup>
import { computed, useSlots, h } from 'vue';

const props = defineProps<{ message: string }>();

const slots = useSlots();

const slotsName = computed(() => {
  return props.message?.match(/{([^}]+)?}/gm)?.map((s) => s.slice(1, s.length - 1));
});

const VNode = () => {
  const _slotsName = slotsName.value || [];

  const el = props.message?.split(/{([^}]+)?}/gm);

  const result = el.map((item) => {
    if (_slotsName.includes(item)) {
      console.log(item);

      return h('span', slots[item]?.());
    }

    return h('span', null, item);
  });

  return result;
};
</script>

<template>
  <VNode />
</template>
