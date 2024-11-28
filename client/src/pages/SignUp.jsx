import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const [FormData, setFormData] = useState({});
  const [Error, setError]=useState(null);
  const [Loading, setLoading]= useState(false);
  const navigate= useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // to prevent refreshing page
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);  // if no error exist then it will show no message
      navigate('/SignIn');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }

    console.log(data);
  };
  console.log(FormData);
  return (
    <div className="p-3 max-w-lg mx-auto items-center">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border rounded-lg p-3"
          onChange={handleChange}
        />
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
          disabled={Loading}
          className="p-3 bg-slate-700 rounded-xl border text-white hover:bg-opacity-95 disabled:opacity-80"  
        >
          {Loading ? 'Loading...': 'SIGN UP'}
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p> Have an account?</p>
        <Link to={"/Signin"}>
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      {Error && <p className="text-red-600 mt-5">{Error}</p>}
    </div>
  );
}
