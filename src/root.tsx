import { App } from './components/app/app';

export const Root = () => {
  return (
    <html lang="en" class="dark:bg-zinc-900 dark:text-white">
      <head>
        <Head />
      </head>
      <body class="font-thin w-screen overflow-x-hidden">
        <App />
      </body>
    </html>
  );
};

const Head = () => (
  <>
    <meta charSet="utf-8" />

    <title>Karolin Rohmer</title>
    <meta name="viewport" content="width=device-width" />

    <link rel="alternate" hrefLang="x-default" href="https://karolinrohmer.com/" />
    <link rel="alternate" hrefLang="de" href="https://karolinrohmer.com/" />
    <link rel="alternate" hrefLang="en" href="https://karolinrohmer.com/en" />

    <meta name="twitter:card" content="summary" />

    <meta name="copyright" content="© Matthias Rohmer 2022" />

    <meta property="og:title" content="Karolin Rohmer" />
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="https://karolinrohmer.com/"/>
    <meta property="og:site_name" content="karolinrohmer.com"/>
  </>
);
