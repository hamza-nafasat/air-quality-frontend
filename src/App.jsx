import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "slick-carousel/slick/slick.css";
import BuildingView from "./components/buildingsData/buildingView/BuildingView";
import FloorView from "./components/buildingsData/floorView/FloorView";
import ChangePassword from "./components/settings/ChangePassword";
import SubscriptionHistory from "./components/settings/SubscriptionHistory";
import Configuration from "./components/settings/Configuration";
import AuthBg from "./components/shared/large/AuthBg";
import Loader from "./components/shared/small/Loader";
import ScrollToTop from "./components/shared/small/ScrollToTop";
import Profile from "./pages/dashboard/profile/Profile";
import Subscription from "./pages/dashboard/subscription/Subscription";
import { useDispatch, useSelector } from "react-redux";
import { useGetMyProfileQuery } from "./redux/apis/authApis";
import { userExist, userNotExist } from "./redux/slices/authSlice";
import ProtectedRoute from "./components/ProtectedRoutes";

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
  const dispatch = useDispatch();
  const { isLoading, data, isSuccess, isError } = useGetMyProfileQuery("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) dispatch(userExist(data?.data));
    else if (isError) dispatch(userNotExist());
  }, [isSuccess, isError, dispatch, data]);

  return isLoading ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute user={!user} redirect="/dashboard">
              <AuthBg Form={Login} />
            </ProtectedRoute>
          }
        />
        <Route path="/forget-password" element={<AuthBg Form={ForgetPassword} />} />
        <Route path="/reset-password" element={<AuthBg Form={ResetPassword} />} />
        <Route path="/signup" element={<AuthBg Form={SignUp} />} />

        {/* Protecting dashboard-related routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute user={user}>
              {" "}
              {/* Wrapping protected routes */}
              <Dashboard />
            </ProtectedRoute>
          }
        >
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
          <Route path="configuration" element={<Configuration />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
