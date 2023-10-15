import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Heading from "../../Heading/Heading";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then(() => {
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="my-10">
      <Heading heading="Login Your Account"></Heading>
      <div className="mt-10 md:flex md:flex-row-reverse mx-10">
      <img className="md:w-96 lg:w-[1000px]" src="https://i.ibb.co/XFM13Lv/Gam-On-2-removebg-preview.png" alt="" />
      <div className="card lg:w-[1000px]  shadow-2xl bg-base-100 mx-auto">
        <form className="card-body bg-slate-300 rounded-xl" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <span className="text-red-600 font-bold">Email is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input w-full"
                {...register("password", { required: true })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center bg-white rounded-lg"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEye/>
                ) : (
                  <FaEyeSlash/>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-600 font-bold">Password is required</span>
            )}
          </div>
          <div className="form-control mt-6">
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
          <SocialLogin />
          <p className="text-[17px] text-black">
            Are you new to this website?{" "}
            <Link className="btn-outline btn-primary px-1 py-3 rounded-xl" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
      
      </div>
    </div>
  );
};

export default Login;
