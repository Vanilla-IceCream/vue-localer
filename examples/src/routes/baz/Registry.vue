<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useSchema } from 'vue-formor';
import { string } from 'yup';

import useLocale from './_locales';

const flux = reactive({
  form: {} as any,
  errors: {} as Record<string, string>,
});

const locale = useLocale();

const schema = useSchema(
  [
    [
      computed(() => flux.form.email),
      computed(() => string().required(locale.value.required).email(locale.value.string.email)),
    ],
    [
      computed(() => flux.form.password),
      computed(() => string().required(locale.value.required).min(8, locale.value.string.min)),
    ],
  ],
  flux,
);

const signIn = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <div>
    <div>
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="flux.form.email" />
      <div>{{ flux.errors['form.email'] }}</div>
    </div>

    <div>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="flux.form.password" />
      <div>{{ flux.errors['form.password'] }}</div>
    </div>

    <button @click="signIn">Sign in</button>
  </div>

  <pre>form: {{ flux.form }}</pre>

  <pre>errors: {{ flux.errors }}</pre>
</template>
