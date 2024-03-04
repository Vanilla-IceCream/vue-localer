import { defineLocale } from 'vue-localer';

import enUS from './en-US';
import jaJP from './ja-JP';

export default defineLocale<typeof enUS>('baz', {
  'en-US': enUS,
  'ja-JP': jaJP,
  'ko-KR': () => import('./ko-KR'),
});
