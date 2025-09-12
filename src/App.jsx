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
import { setCount } from './redux/slices/notificationSlice';
import Users from './pages/dashboard/users/Users';
import { ROLES } from './components/roles';

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
  console.log('user', user);

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

  useEffect(() => {
    if (!user?._id) {
      // Disconnect if logged out
      if (socket.connected) {
        socket.disconnect();
        console.log('❌ [Frontend] Socket disconnected on logout');
      }
      return; // exit early
    }

    // Attach userId and connect
    if (!socket.connected) {
      socket.auth = { userId: user._id };
      socket.connect();
    }

    // ✅ Handlers
    const handleConnect = () => {
      console.log('✅ [Frontend] Connected:', socket.id);
      socket.emit('register', user._id);
    };

    const handleNotification = (notification) => {
      console.log('🔔 [Frontend] New notification:', notification);

      switch (notification.severity) {
        case 'high':
          toast.error(notification.message);
          break;
        case 'low':
          toast.warning(notification.message);
          break;
        default:
          toast.info(notification.message);
      }
    };
    const handleNotificationCount = (count) => {
      console.log('🔢 [Frontend] Notification count:', count);
      dispatch(setCount(count));
      // optional: store it in state so you can show a badge in UI
      // setNotificationCount(count);
    };
    // Attach listeners once
    socket.on('connect', handleConnect);
    // socket.on('new-notification', handleNotification);
    socket.on('notification-count', handleNotificationCount);

    // ✅ Cleanup when user changes or component unmounts
    return () => {
      socket.off('connect', handleConnect);
      // socket.off('new-notification', handleNotification);
      socket.off('notification-count', handleNotificationCount);
    };
  }, [user]);

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
          {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

          {/* Protected Dashboard */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* Inspection user pages */}
            <Route
              path="building-view/:id"
              element={
                <ProtectedRoute user={user} allowedRoles={[ROLES.INSPECTION, ROLES.ADMIN]}>
                  <BuildingView />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit-building/:id"
              element={
                <ProtectedRoute user={user} allowedRoles={[, ROLES.ADMIN]}>
                  <EditBuilding />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit-floor/:id"
              element={
                <ProtectedRoute user={user} allowedRoles={[, ROLES.ADMIN]}>
                  <FloorEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="floor-view/:id"
              element={
                <ProtectedRoute user={user} allowedRoles={[ROLES.INSPECTION, ROLES.ADMIN]}>
                  <FloorView />
                </ProtectedRoute>
              }
            />
            <Route
              path="add-floor/:id"
              element={
                <ProtectedRoute user={user} allowedRoles={[, ROLES.ADMIN]}>
                  <AddFloor />
                </ProtectedRoute>
              }
            />
            <Route
              path="buildings"
              element={
                <ProtectedRoute user={user} allowedRoles={[ROLES.INSPECTION, ROLES.ADMIN]}>
                  <Buildings />
                </ProtectedRoute>
              }
            />

            {/* Reportor pages */}
            <Route
              path="reports"
              element={
                <ProtectedRoute user={user} allowedRoles={[ROLES.REPORTER, ROLES.ADMIN]}>
                  <Reports />
                </ProtectedRoute>
              }
            />

            {/* Subscriptions user pages */}
            <Route
              path="subscription"
              element={
                <ProtectedRoute user={user} allowedRoles={[ROLES.SUBSCRIPTIONS, ROLES.ADMIN]}>
                  <Subscription />
                </ProtectedRoute>
              }
            />
            <Route
              path="subscription-history"
              element={
                <ProtectedRoute user={user} allowedRoles={[ROLES.SUBSCRIPTIONS, ROLES.ADMIN]}>
                  <SubscriptionHistory />
                </ProtectedRoute>
              }
            />

            {/* Shared pages (all roles can use settings) */}
            <Route
              path="settings"
              element={
                <ProtectedRoute
                  user={user}
                  allowedRoles={[
                    ROLES.ADMIN,
                    ROLES.REPORTER,
                    ROLES.INSPECTION,
                    ROLES.SUBSCRIPTIONS,
                  ]}
                >
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Admin-only pages */}
            <Route
              path="devices"
              element={
                <ProtectedRoute user={user} allowedRoles={[ROLES.ADMIN]}>
                  <Devices />
                </ProtectedRoute>
              }
            />
            <Route
              path="sensors"
              element={
                <ProtectedRoute user={user} allowedRoles={[ROLES.ADMIN]}>
                  <Sensors />
                </ProtectedRoute>
              }
            />
            <Route
              path="alerts"
              element={
                <ProtectedRoute user={user} allowedRoles={[ROLES.ADMIN]}>
                  <AlertType />
                </ProtectedRoute>
              }
            />
            <Route
              path="sensors/sensor-detail/:id"
              element={
                <ProtectedRoute user={user} allowedRoles={[ROLES.ADMIN]}>
                  <SensorDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="add-building"
              element={
                <ProtectedRoute user={user} allowedRoles={[ROLES.ADMIN]}>
                  <BuildingStepper />
                </ProtectedRoute>
              }
            />
            <Route
              path="configuration"
              element={
                <ProtectedRoute user={user} allowedRoles={[ROLES.ADMIN]}>
                  <Configuration />
                </ProtectedRoute>
              }
            />
            <Route
              path="change-password"
              element={
                <ProtectedRoute
                  user={user}
                  allowedRoles={[
                    ROLES.ADMIN,
                    ROLES.REPORTER,
                    ROLES.INSPECTION,
                    ROLES.SUBSCRIPTIONS,
                  ]}
                >
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute
                  user={user}
                  allowedRoles={[
                    ROLES.ADMIN,
                    ROLES.REPORTER,
                    ROLES.INSPECTION,
                    ROLES.SUBSCRIPTIONS,
                  ]}
                >
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="notifications"
              element={
                <ProtectedRoute user={user} allowedRoles={[ROLES.ADMIN]}>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute user={user} allowedRoles={[ROLES.ADMIN]}>
                  <Users />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
