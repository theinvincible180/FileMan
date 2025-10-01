import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CloudUpload } from "lucide-react";
import { loginUser } from "../redux/slice/auth/authThunk";
import { useDispatch } from "react-redux";
import finallogo from "../assets/finallogo.jpg";

const LoginPage = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  async function LoginHandler(e) {
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      // const res = await axios.post(
      //   `http://localhost:5000/api/users/login`,
      //   input,
      //   {
      //     headers: { "Content-Type": "application/json" },
      //     withCredentials: true,
      //   }
      // );
      // if (res.data.success) {
      //   console.log(res.data);
        dispatch(loginUser(input));
        navigate("/home");

        toast.success("Login Successsfull");
        setInput({ email: "", password: "" });
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <div className="flex w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Left: Login Form */}
        <div className="flex w-full md:w-1/2 items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <CloudUpload className="w-14 h-14 text-purple-600 mb-4 mx-auto" />
            <h2 className="text-center text-3xl font-bold mb-6 text-purple-700">
              Welcome Back
            </h2>

            <form className="space-y-5" onSubmit={LoginHandler}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={ChangeEventHandler}
                  placeholder="you@example.com"
                  className="w-full border rounded-xl px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={ChangeEventHandler}
                  placeholder="••••••••"
                  className="w-full border rounded-xl px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex  justify-end text-sm text-blue-700 underline font-semibold"></div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white rounded-xl py-2.5 font-semibold hover:bg-purple-700 transition-colors"
              >
                Login
              </button>
              <p className="text-sm text-center text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-purple-600 font-medium hover:underline"
                >
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="hidden md:flex w-[75%] bg-purple-50 items-center justify-center p-6">
          <img
            src={finallogo}
            alt="File Sharing Illustration"
            className="w-full drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
