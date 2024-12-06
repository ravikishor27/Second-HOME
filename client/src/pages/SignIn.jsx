import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
export default function Signin() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate= useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // to prevent refreshing page
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data))  // if no error exist then it will show no message
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message))
    }

    console.log(data);
  };
  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto items-center">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="p-3 bg-slate-700 rounded-xl border text-white hover:bg-opacity-95 disabled:opacity-80"  
        >
          {loading ? "LOADING..": 'SIGN IN'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Do not have an account?</p>
        <Link to={"/Signup"}>
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-600 mt-5">{error}</p>}
    </div>
  );
}

