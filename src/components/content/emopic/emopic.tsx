import {component$, Host, Slot, useScopedStyles$} from '@builder.io/qwik';
import {BgCanvas} from '../bg-canvas/bg-canvas';
import styles from './emopic.css?inline';

export const SocialLink = component$(({href}: Record<'href', string> & any) => (
  <a href={href} target="_blank" rel="noopener nofollow" class="block cursor-pointer mx-0.5 p-1">
    <Slot/>
  </a>
))
export const Emopic = component$(() => {
  useScopedStyles$(styles);
  return (
    <Host class="min-h-screen flex flex-col items-center bg-gray-200 dark:bg-zinc-900 select-none">
      <BgCanvas/>
      <div class="flex-1 flex items-center z-10">
        <div class="flex flex-col md:flex-row items-center">
          <div className="w-60 h-60 rounded overflow-hidden mb-5 md:mr-6 md:mb-0 text-center">
            <img src="/images/profile.webp" class="h-full inline-block"/>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-normal tracking-widest uppercase">Karolin Rohmer</h1>
            <h2 className="font-normal">
              <Slot name="slogan"/>
            </h2>
            <h3>
              <Slot name="subslogan"/>
            </h3>
          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row items-center py-4 align-baseline z-10">
        <div class="flex justify-center">
          <SocialLink href="https://www.linkedin.com/in/karolin-rohmer-rocks">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path
                d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 0 1-1.548-1.549 1.548 1.548 0 1 1 1.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"/>
            </svg>
          </SocialLink>
          <SocialLink href="https://www.xing.com/profile/Karolin_Rohmer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path
                d="M20.462 3.23c.153 0 .307.078.384.155a.49.49 0 0 1 0 .461l-6.077 10.77 3.846 7.076a.49.49 0 0 1 0 .462.588.588 0 0 1-.384.154h-2.77c-.384 0-.615-.308-.769-.539l-3.923-7.154C11 14.308 16.923 3.77 16.923 3.77c.154-.307.385-.538.77-.538h2.769zM8.923 7c.385 0 .615.308.77.538l1.922 3.308c-.153.154-3 5.23-3 5.23-.153.232-.384.54-.769.54H5.154a.588.588 0 0 1-.385-.154.49.49 0 0 1 0-.462l2.846-5.154-1.846-3.23a.49.49 0 0 1 0-.462A.588.588 0 0 1 6.154 7h2.77z"/>
            </svg>
          </SocialLink>
          <SocialLink href="https://www.instagram.com/karolin_h_rohmer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path
                d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.25a1.25 1.25 0 0 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 4c-2.474 0-2.878.007-4.029.058-.784.037-1.31.142-1.798.332-.434.168-.747.369-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.006 9.075 4 9.461 4 12c0 2.474.007 2.878.058 4.029.037.783.142 1.31.331 1.797.17.435.37.748.702 1.08.337.336.65.537 1.08.703.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.474 0 2.878-.007 4.029-.058.782-.037 1.309-.142 1.797-.331.433-.169.748-.37 1.08-.702.337-.337.538-.65.704-1.08.19-.493.296-1.02.332-1.8.052-1.104.058-1.49.058-4.029 0-2.474-.007-2.878-.058-4.029-.037-.782-.142-1.31-.332-1.798a2.911 2.911 0 0 0-.703-1.08 2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.925 4.006 14.539 4 12 4zm0-2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z"/>
            </svg>
          </SocialLink>
        </div>

        <a href="mailto:info@karolinrohmer.com" class="block mt-5 mb-4 md:mx-10 md:my-0">info@karolinrohmer.com</a>

        <a href="https://manager.ddim.de/de/member/135040100000032383.php" class="block whitespace-nowrap">
          <div class="inline-block align-middle"><Slot name="memberof"/></div>
          <img src="/images/ddim.webp" alt="DDIM." class="ddim"/>
        </a>
      </div>
    </Host>
  )
})
