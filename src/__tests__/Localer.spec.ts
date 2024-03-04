import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import Localer from '../Localer.vue';

test('Localer - en', () => {
  const en = {
    term: `I have read and agree to the {LA}.`,
    LA: 'License Agreement',
  };

  const wrapper = mount(Localer, {
    props: {
      message: en.term,
    },
    slots: {
      LA: `<a href="https://...">${en.LA}</a>`,
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('Localer - ja', () => {
  const ja = {
    term: `{LA}を読み、同意します。`,
    LA: 'ライセンス契約',
  };

  const wrapper = mount(Localer, {
    props: {
      message: ja.term,
    },
    slots: {
      LA: `<a href="https://...">${ja.LA}</a>`,
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});
