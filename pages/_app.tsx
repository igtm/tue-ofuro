import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { Header } from "../components/organisms/Header";

function App({ Component, pageProps }: AppProps) {
  console.log("We are hiring!");
  return (
    <div>
      <Header />
      <div className="max-w-screen-md m-auto mt-8 mb-8">
        <Component {...pageProps} />
        <div className="text-center mt-4 mb-8">©火曜日のおフロ</div>
      </div>
    </div>
  );
}

export default App;
