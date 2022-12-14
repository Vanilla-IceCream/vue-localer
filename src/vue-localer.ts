import { ref, reactive, inject } from 'vue';
import mi from 'message-interpolation';

export const createLocaler = ({ fallbackLocale, messages }) => {
  return {
    install(app, options) {
      app.config.globalProperties.$f = mi;

      app.provide('vue-localer');
    },
  };
};

export const useLocaler = () => {
  return {};
};

export const defineLocale = () => {

};

export const useLocale = () => {
  return {
    f: mi,
  };
};

export { default as Localer} from './Localer.vue';
