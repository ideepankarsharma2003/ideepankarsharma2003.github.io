import { Header, Footer } from "./components/Layout.jsx";
import { UIProvider } from "./sidequest/context/UIContext.jsx";

export default function App({ page, Page }) {
  return (
    <UIProvider>
      <div className="sq-shell relative">
        <Header active={page.active} />
        <Page {...page.props} />
        <Footer />
      </div>
    </UIProvider>
  );
}
