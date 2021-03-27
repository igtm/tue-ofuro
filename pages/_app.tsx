import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { Footer } from "../components/organisms/Footer";
import { Header } from "../components/organisms/Header";
import "../styles/dangerous.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="flex flex-col min-h-screen relative z-0">
      <div className="flex-shrink-0 sticky top-0 z-10">
        <Header />
      </div>

      <div className="flex-grow w-full max-w-screen-md m-auto mt-8 mb-8 px-8">
        <Component {...pageProps} />
      </div>

      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
};

export default App;
