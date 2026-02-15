import useTitleTyping from "../hooks/useTitleTyping";

export default function MyApp({ Component, pageProps }) {
  useTitleTyping(); // <- runs on every page

  return <Component {...pageProps} />;
}
