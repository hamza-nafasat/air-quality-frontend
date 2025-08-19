import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import EditBuilding from './components/buildings/EditBuilding';
import BuildingView from './components/buildingsData/buildingView/BuildingView';
import FloorView from './components/buildingsData/floorView/FloorView';
import ProtectedRoute from './components/ProtectedRoutes';
import ChangePassword from './components/settings/ChangePassword';
import Configuration from './components/settings/Configuration';
import SubscriptionHistory from './components/settings/SubscriptionHistory';
import AuthBg from './components/shared/large/AuthBg';
import Loader from './components/shared/small/Loader';
import ScrollToTop from './components/shared/small/ScrollToTop';
import AlertType from './pages/dashboard/alerts';
import Profile from './pages/dashboard/profile/Profile';
import Subscription from './pages/dashboard/subscription/Subscription';
import { useGetMyProfileFirstTimeMutation } from './redux/apis/authApis';
import { userExist, userNotExist } from './redux/slices/authSlice';
import FloorEdit from './components/buildingsData/floorEdit/FloorEdit';
import AddFloor from './components/buildingsData/addFloor/AddFloor';
import Notifications from './pages/dashboard/notifications/Notifications';
import { socket } from './sockets/socket';
import { toast } from 'react-toastify';

const Dashboard = lazy(() => import('./pages/dashboard/index'));
const Buildings = lazy(() => import('./pages/dashboard/buildings/Buildings'));
const Devices = lazy(() => import('./pages/dashboard/devices/Devices'));
const Reports = lazy(() => import('./pages/dashboard/reports/Reports'));
const Sensors = lazy(() => import('./pages/dashboard/sensors/Sensors'));
const SensorDetail = lazy(() => import('./pages/dashboard/sensors/SensorDetail'));
const Settings = lazy(() => import('./pages/dashboard/settings/Settings'));
const Login = lazy(() => import('./pages/auth/Login'));
const ForgetPassword = lazy(() => import('./pages/auth/ForgetPassword'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const BuildingStepper = lazy(() => import('./components/buildings/BuildingStepper'));

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [getUserProfile] = useGetMyProfileFirstTimeMutation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserProfile()
      .then((res) => {
        if (res?.data?.success) dispatch(userExist(res?.data?.data));
      })
      .catch(() => {
        dispatch(userNotExist());
      })
      .finally(() => setLoading(false));
  }, [getUserProfile, dispatch]);

  // ✅ Listen for socket notifications once
  useEffect(() => {
    const handleNotification = (notification) => {
      console.log('🔔 [Frontend] New notification received:', notification);

      toast.info(
        notification.message
        //   , {
        //   position: 'top-right',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   theme: 'colored',
        // }
      );
    };

    socket.on('new-notification', handleNotification);

    return () => {
      socket.off('new-notification', handleNotification);
    };
  }, []);
  // socket.on('new-notification', (notification) => {
  //   console.log('🔔 [Frontend] New notification received:', notification);
  //   toast.info();
  //   // you can show toast here
  //   // toast.info(notification.message);
  // });

  return loading ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
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
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="building-view/:id" element={<BuildingView />} />
            <Route path="edit-building/:id" element={<EditBuilding />} />
            <Route path="edit-floor/:id" element={<FloorEdit />} />
            <Route path="floor-view/:id" element={<FloorView />} />
            <Route path="add-floor/:id" element={<AddFloor />} />
            <Route path="buildings" element={<Buildings />} />
            <Route path="devices" element={<Devices />} />
            <Route path="reports" element={<Reports />} />
            <Route path="sensors" element={<Sensors />} />
            <Route path="alerts" element={<AlertType />} />
            <Route path="sensors/sensor-detail/:id" element={<SensorDetail />} />
            <Route path="settings" element={<Settings />} />
            <Route path="add-building" element={<BuildingStepper />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="subscription-history" element={<SubscriptionHistory />} />
            <Route path="configuration" element={<Configuration />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
