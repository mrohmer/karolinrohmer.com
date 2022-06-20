import {component$, Host} from '@builder.io/qwik';
import {Main} from '../../components/main/main';
import {Footer} from '../../components/footer/footer';

const NotFound = component$(() => {
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
