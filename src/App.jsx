import { lazy, Suspense } from "react";
import Loader from "./components/shared/small/Loader";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthBg from "./components/shared/large/AuthBg";
import BuildingView from "./components/buildingsData/buildingView/BuildingView";
import FloorView from "./components/buildingsData/floorView/FloorView";
import Subscription from "./pages/dashboard/subscription/Subscription";
import ScrollToTop from "./components/shared/small/ScrollToTop";
import Profile from "./pages/dashboard/profile/Profile";
import SubscriptionHistory from "./components/settings/SubscriptionHistory";
import ChangePassword from "./components/settings/ChangePassword";
const Dashboard = lazy(() => import("./pages/dashboard/index"));
const Buildings = lazy(() => import("./pages/dashboard/buildings/Buildings"));
const Devices = lazy(() => import("./pages/dashboard/devices/Devices"));
const Reports = lazy(() => import("./pages/dashboard/reports/Reports"));
const Sensors = lazy(() => import("./pages/dashboard/sensors/Sensors"));
const SensorDetail = lazy(() => import("./pages/dashboard/sensors/SensorDetail"));
const Settings = lazy(() => import("./pages/dashboard/settings/Settings"));
const Login = lazy(() => import("./pages/auth/Login"));
const ForgetPassword = lazy(() => import("./pages/auth/ForgetPassword"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const BuildingStepper = lazy(() => import("./components/buildings/BuildingStepper"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AuthBg Form={Login} />} />
        <Route path="/forget-password" element={<AuthBg Form={ForgetPassword} />} />
        <Route path="/reset-password" element={<AuthBg Form={ResetPassword} />} />
        <Route path="/signup" element={<AuthBg Form={SignUp} />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="building-view/:id" element={<BuildingView />} />
          <Route path="floor-view/:id" element={<FloorView />} />

          <Route path="buildings" element={<Buildings />} />
          <Route path="devices" element={<Devices />} />
          <Route path="reports" element={<Reports />} />
          <Route path="sensors" element={<Sensors />} />
          <Route path="sensors/sensor-detail/:id" element={<SensorDetail />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-building" element={<BuildingStepper />} />

          <Route path="subscription" element={<Subscription />} />
          <Route path="subscription-history" element={<SubscriptionHistory />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </Suspense>
  );
}

export default App;
