import { AppProps } from "next/app";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import { FloatingPlayArea } from "../components/organisms/FloatingPlayArea";
import { FontRoot } from "../components/organisms/FontRoot";
import { Footer } from "../components/organisms/Footer";
import { Header } from "../components/organisms/Header";
import { CustomFontStateProvider } from "../context/CustomFont";
import { FloatingPlayAreaStateProvider } from "../context/FloatingPlayAreaContext";
import "../styles/dangerous.css";
import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <div>
      <CustomFontStateProvider>
        <FloatingPlayAreaStateProvider>
          <FontRoot>
            <div className="flex flex-col min-h-screen relative z-0">
              <div className="flex-shrink-0 sticky top-0 z-10 w-full">
                <Header />
              </div>

              <div
                className={
                  isHome
                    ? "flex-grow w-full"
                    : "flex-grow w-full max-w-screen-md m-auto mt-8 mb-8 px-4"
                }
              >
                <Component {...pageProps} />
              </div>

              <div className="flex-shrink-0">
                <Footer />
              </div>
            </div>
          </FontRoot>
          <FloatingPlayArea />
        </FloatingPlayAreaStateProvider>
      </CustomFontStateProvider>
    </div>
  );
};

export default App;
