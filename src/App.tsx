import "./App.css";
import { FeatureFlag } from "./components/FeatureFlag";

function App() {
  return (
    <>
      <h1>Feature Flags</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <FeatureFlag feature="SHARE_WITH_TEAM">
          <button>Compartilhar com o time</button>
        </FeatureFlag>
        <FeatureFlag feature="NEW_INTEGRATION_PAGE">
          <button>Nova página de integração</button>
        </FeatureFlag>
        <FeatureFlag feature="NEW_ONBOARDING_PAGE">
          <button>Nova página de onboarding</button>
        </FeatureFlag>
        <FeatureFlag feature="ADVANCED_SEARCH">
          <button>Pesquisa avançada</button>
        </FeatureFlag>
      </div>
    </>
  );
}

export default App;
