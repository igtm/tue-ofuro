import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { FloatingPlayArea } from "../components/organisms/FloatingPlayArea";
import { Footer } from "../components/organisms/Footer";
import { Header } from "../components/organisms/Header";
import { FloatingPlayAreaStateProvider } from "../context/FloatingPlayAreaContext";
import "../styles/dangerous.css";
import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <FloatingPlayAreaStateProvider>
        <div className="flex flex-col min-h-screen relative z-0">
          <div className="flex-shrink-0 sticky top-0 z-10">
            <Header />
          </div>

          <div className="flex-grow w-full max-w-screen-md m-auto mt-8 mb-8 px-4">
            <Component {...pageProps} />
          </div>

          <div className="flex-shrink-0">
            <Footer />
          </div>
        </div>

        <FloatingPlayArea />
      </FloatingPlayAreaStateProvider>
    </div>
  );
};

export default App;
