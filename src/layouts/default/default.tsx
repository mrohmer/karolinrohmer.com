import {component$, Slot, useScopedStyles$} from '@builder.io/qwik';
import styles from './default.css?inline';
import {LanguageSwitch} from '../../components/language-switch/language-switch';
import {Footer} from '../../components/footer/footer';
import {Main} from '../../components/main/main';

const DefaultLayout = component$(() => {
  useScopedStyles$(styles);

  return (
    <>
      <Main>
        <LanguageSwitch />

        <Slot />
      </Main>
      <Footer />
    </>
  );
});

export default DefaultLayout;
