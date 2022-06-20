import {component$, Host} from '@builder.io/qwik';
import classNames from 'classnames';
import {usePage} from '@builder.io/qwik-city';

export const LanguageSwitch = component$(() => {
  const page = usePage();
  const lang = page?.attributes.lang;
  return (
    <Host class="absolute top-2 right-5 z-50">
      <a href="/" class={classNames('px-1', {'text-primary': lang === 'de'})}>DE</a>
      /
      <a href="/en" class={classNames('px-1', {'text-primary': lang === 'en'})}>EN</a>
    </Host>
  )
});
