import {component$, Host, Slot} from '@builder.io/qwik';

export const Main = component$(
  () => (
    <Host class="z-10 min-h-screen bg-white dark:bg-zinc-900">
      <Slot/>
    </Host>
  ),
  {
    tagName: 'main'
  },
)
