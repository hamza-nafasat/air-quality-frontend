import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer autoClose={3000} />
  </>
  // </StrictMode>
);
