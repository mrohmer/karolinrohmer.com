import {component$, Slot} from '@builder.io/qwik';
import {LanguageSwitch} from '../../components/language-switch/language-switch';
import {Footer} from '../../components/footer/footer';
import {Main} from '../../components/main/main';

const DefaultLayout = component$(() => {
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
