import { createLocaler } from 'vue-localer';

import enUS from '~/locales/en-US';
import jaJP from '~/locales/ja-JP';

export default createLocaler({
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'ja-JP': jaJP,
  },
});
