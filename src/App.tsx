import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import { isMobile, isTablet } from "react-device-detect";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./Loader";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Rooms = lazy(() => import("./pages/BookRoom"));
const Halls = lazy(() => import("./pages/BookHall"));
const BookingForm = lazy(() => import("./pages/BookingDetails/BookingForm"));
const AddReview = lazy(() => import("./pages/Reviews/AddReview"));
const Checkbooking = lazy(() => import("./pages/Checkbooking"));
const ConfirmDetails = lazy(() => import("./pages/success/ConfirmDetails"));
const Register = lazy(() => import("./pages/register/Register"));
const Login = lazy(() => import("./pages/register/Login"));

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const location = useLocation();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(100);
  }, [location]);

  if (isMobile || isTablet) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#000",
            textAlign: "center",
          }}
        >
          Mobile version is not available
        </h1>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <ToastContainer />
      <LoadingBar
        color="#f11946"
        loaderSpeed={1000}
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
        transitionTime={1000}
      />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="halls" element={<Halls />} />
          <Route path="bookings" element={<BookingForm />} />
          <Route path="booking/success" element={<ConfirmDetails />} />
          <Route path="addreview" element={<AddReview />} />
          <Route path="checkbooking" element={<Checkbooking />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
