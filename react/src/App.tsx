import { Toaster } from "sonner";
import AppRoutes from "./components/routes/AppRoutes";
import AuthWrapper from "./AuthWrapper";

function App() {
  return (
    <AuthWrapper>
      <Toaster />
      <AppRoutes />
    </AuthWrapper>
  );
}

export default App;
