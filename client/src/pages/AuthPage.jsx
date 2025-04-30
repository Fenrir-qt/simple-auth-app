import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AuthPage() {
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = activeSlide === 0 ? "Login" : "Register";
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((response) => console.log(response.data))
      .catch((error) =>
        console.error("There was a problem with the axios operation")
      );
  }, []);

  const [identifier, setIdentifier] = useState("");
  const [username, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleRegister = (e) => {
    e.preventDefault();
  
    const isValid = checkPasswordStrength(password);
  
    if (!isValid) {
      alert("Password must include at least one special character and be at least 6 characters long.");
      return;
    }
  
    axios
      .post("http://localhost:3000/api/auth/register", { username, email, password })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
      alert("Sign-Up successful! You may now proceed to login.")
      window.location.reload();
  };
  
  const handleLogin = (e) => {
    e.preventDefault();



  axios
    .post("http://localhost:3000/api/auth/login", { identifier, password }, { withCredentials: true })
    .then((result) => {
      console.log(result);
      navigate("/Home"); 
    })
    .catch((err) => console.log(err));
  };
  
  const checkPasswordStrength = (password) => {
    const regex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/;
    return regex.test(password);
  };
  

  return (
    <>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        spaceBetween={50}
        slidesPerView={1}
        allowTouchMove={false}
      >
        <SwiperSlide>
          <div className="h-screen flex flex-col justify-center items-center">
            <form action="" className="flex flex-col gap-2 w-80 md:w-100" onSubmit={handleLogin}>
              <div className="w-15 h-15 mx-auto mb-3">
                <img src="./src/assets/user.png" alt="user icon" />
              </div>
              <label htmlFor="identifier">Username or Email: </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  👤
                </span>
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  autoComplete="off"
                  className="p-2 pl-10 w-80 md:w-100 border-1 border-solid rounded-md"
                  placeholder="Enter username or email"
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              <label htmlFor="password">Password: </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  🔒
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  className="p-2 pl-10 w-80 md:w-100 border-1 border-solid rounded-md"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <span className="mt-2">
                <a
                  href=""
                  className="hover:text-blue-400 cursor-pointer duration-200"
                >
                  Forgot Password?
                </a>
                <a
                  href="#"
                  onClick={() => swiperRef.current.slideNext()}
                  className="ml-11 md:ml-31 hover:text-blue-400 cursor-pointer duration-200"
                >
                  Create an Account
                </a>
              </span>

              <button className="bg-blue-500 p-2 text-white mt-2 rounded-md hover:bg-blue-900 cursor-pointer duration-200">
                Login
              </button>
            </form>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-screen flex flex-col justify-center items-center">
            <form action="" className="flex flex-col gap-2 w-80 md:w-100" onSubmit={handleRegister}>
              <div className="w-15 h-15 mx-auto mb-3">
                <img src="./src/assets/register.png" alt="register icon" />
              </div>
              <label htmlFor="email">Email: </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  ✉️
                </span>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                  className="p-2 pl-10 w-80 md:w-100 border-1 border-solid rounded-md"
                  placeholder="Enter an email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label htmlFor="username">Username: </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  👤
                </span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="off"
                  className="p-2 pl-10 w-80 md:w-100 border-1 border-solid rounded-md"
                  placeholder="Create a username"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <label htmlFor="password">Password: </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  🔒
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  className="p-2 pl-10 w-80 md:w-100 border-1 border-solid rounded-md"
                  placeholder="Create a strong password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <a
                href="#"
                onClick={() => swiperRef.current.slidePrev()}
                className="ml- hover:text-blue-400 cursor-pointer duration-200 mt-2"
              >
                Back to Login
              </a>
              <button className="bg-blue-500 p-2 text-white mt-2 rounded-md hover:bg-blue-900 cursor-pointer duration-200">
                Sign-Up
              </button>
            </form>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
