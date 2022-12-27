import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

// @ts-ignore
import Plugin from './fixtures/Plugin.vue';
// @ts-ignore
import LocalScope from './fixtures/LocalScope.vue';
// @ts-ignore
import LazyLoading from './fixtures/LazyLoading.vue';
import { createLocaler } from './vue-localer';

test('Plugin', () => {
  const localer = createLocaler({
    fallbackLocale: 'en',
    messages: {
      en: { hello: `Hello, {msg}!` },
      ja: { hello: `こんにちは、{msg}!` },
    },
  });

  const wrapper = mount(Plugin, {
    global: {
      plugins: [localer],
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('LocalScope', () => {
  const localer = createLocaler({
    fallbackLocale: 'en',
    messages: {},
  });

  const wrapper = mount(LocalScope, {
    global: {
      plugins: [localer],
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('LazyLoading', async () => {
  const localer = createLocaler({
    fallbackLocale: 'en',
    messages: {
      en: { hello: `Hello, {msg}!` },
      ja: () => import('./fixtures/ja'),
    },
  });

  const wrapper = mount(LazyLoading, {
    global: {
      plugins: [localer],
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});
