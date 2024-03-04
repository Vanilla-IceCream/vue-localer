<script lang="ts" setup>
import { computed, reactive, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { useLocaler } from 'vue-localer';
import { object, nullish, string, minLength, email } from 'valibot';

import useLocale from './locales';

interface SignIn {
  email?: string;
  password?: string;
}

const localer = useLocaler();

const locale = useLocale();

const state = reactive({
  form: {} as SignIn,
  valdn: {} as Record<keyof SignIn, string>,
});

const schema = useValibotSchema(
  computed(() =>
    object({
      email: nullish(string([minLength(1, locale.value.required), email(locale.value.email)]), ''),
      password: nullish(
        string([
          minLength(1, locale.value.required),
          minLength(8, localer.f(locale.value.minLength, [8])),
        ]),
        '',
      ),
    }),
  ),
  toRef(state, 'form'),
  toRef(state, 'valdn'),
);

const signIn = () => {
  if (schema.validate()) {
    console.log(state.form);
  }
};
</script>

<template>
  <form>
    <div>
      <label for="email">Email:</label>
      <input v-model="state.form.email" id="email" type="email" />
      <div>{{ state.valdn.email }}</div>
    </div>

    <div>
      <label for="password">Password:</label>
      <input v-model="state.form.password" id="password" type="password" />
      <div>{{ state.valdn.password }}</div>
    </div>

    <button type="button" @click="signIn">Sign in</button>
  </form>

  <pre>form: {{ state.form }}</pre>
  <pre>valdn: {{ state.valdn }}</pre>
</template>
