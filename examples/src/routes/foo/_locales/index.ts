import { defineLocale } from 'vue-localer';

import enUS from './en-US';
import jaJP from './ja-JP';

export default defineLocale('foo', {
  'en-US': enUS,
  'ja-JP': jaJP,
});
