import { component$, Host, useScopedStyles$ } from '@builder.io/qwik';
import styles from './footer.css?inline';

export const Footer = component$(
  () => {
    useScopedStyles$(styles);

    return (
      <Host class="h-20 left-0 bottom-0 w-screen">
          <div class="bg-zinc-900 dark:bg-white fixed h-20 left-0 bottom-0 w-screen">
            <div class="text-sm text-center text-white dark:text-zinc-900 py-5">
              <b>© Karolin Rohmer {new Date().getFullYear()}</b><br/>
              Webdesign by <a href="https://matthias.rohmer.rocks" target="_blank">Matthias Rohmer</a>
            </div>
          </div>
      </Host>
    );
  },
  { tagName: 'footer' }
);
