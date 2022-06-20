import {component$, Host, useScopedStyles$} from '@builder.io/qwik';
import styles from './not-found.css?inline';
import {Main} from '../../components/main/main';
import {Footer} from '../../components/footer/footer';

const NotFound = component$(() => {
  useScopedStyles$(styles);

  return (
    <Host>
      <Main>
        <div class="text-center py-5">Not Found 🤷</div>
      </Main>
      <Footer/>
    </Host>
  );
});

export default NotFound;
