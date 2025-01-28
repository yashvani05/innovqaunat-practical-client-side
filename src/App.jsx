import { CalendarCheck, LifeBuoy, Contact as ConatctIcon } from "lucide-react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Sidebar from "./components/SideBar";
import ProtectedRoute from "./lib/ProtectedRoutes";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUpForm from "./pages/SignUpForm";
import EncyptedList from "./pages/EncyptedList";
import NotFoundPage from "./lib/NotFoundPage";
import { useSelector } from "react-redux";
import SidebarItem from "./components/SideBarItem";

const AuthenticatedLayout = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div style={{ display: "flex" }}>
      <Sidebar>
        <SidebarItem icon={<LifeBuoy size={20} />} text="About" to="/about" />
        <SidebarItem
          icon={<ConatctIcon size={20} />}
          text="Contact"
          to="/contact"
        />
        <SidebarItem
          icon={<CalendarCheck size={20} />}
          text="Encrypted List"
          to="/todolist"
        />
      </Sidebar>

      <div style={{ width: "100%" }}>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/todolist" element={<EncyptedList />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
};

const UnauthenticatedLayout = ({ children }) => {
  return <div>{children}</div>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Signup" />} />

        <Route
          path="/Signup"
          element={
            <UnauthenticatedLayout>
              <SignUpForm />
            </UnauthenticatedLayout>
          }
        />
        <Route
          path="/login"
          element={
            <UnauthenticatedLayout>
              <Login />
            </UnauthenticatedLayout>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<AuthenticatedLayout />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
