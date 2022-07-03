import {component$, Host, Slot} from '@builder.io/qwik';

export const Bio = component$(() => (
  <Host class="dark:bg-black py-16 px-10">
    <div class="text-center max-w-3xl mx-auto">
      <p>
        <Slot />
      </p>
    </div>
  </Host>
))
