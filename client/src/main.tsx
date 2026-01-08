import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.tsx";
import "./index.css";

// Replace 'YOUR_GOOGLE_CLIENT_ID' with your actual client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "45063983900-q279l8veb9bbubh0hjid0h9dvk3ei6qi.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);