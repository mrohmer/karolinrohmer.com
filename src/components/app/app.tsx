import {component$, Host, useStyles$} from '@builder.io/qwik';
import { Page } from '../page/page';
import { useQwikCity } from '@builder.io/qwik-city';
import styles from '../../global.css?inline';

export const App = component$(() => {
  useQwikCity();
  useStyles$(styles);

  return (
    <Host>
      <Page />
    </Host>
  );
});
