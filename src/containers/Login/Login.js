import React, { useState } from "react";
import HospitalLogo from "../../components/HospitalLogo";
import { useForm } from "react-hook-form";
import { getFormErrMsg } from "../../utils/utils";
import LoadingButton from "../../components/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { emailRegex } from "../../utils/regexValues";
import axios from "../../helpers/axios";
import { jwtDecode } from "jwt-decode";
import CustomErrorMessage from "../../components/CustomErrorMessage";
import { formatApiFormErrors } from "../../utils/utils";
import { setUserProfile } from "../../redux/reducers/auth";
import { useDispatch } from "react-redux";

const formFields = {
  email: "email",
  password: "password",
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isBtnLoader, setIsBtnLoader] = useState(false);
  const [errMsg, setErrMsg] = useState();

  const onSubmit = async (data) => {
    const result = await axios
      .post("auth/login", data)
      .then((res) => res)
      .catch((err) => err);
    const { status, accessToken } = result?.data;
    if (status) {
      const user = jwtDecode(accessToken)?.data;
      sessionStorage?.setItem("accessToken", accessToken);
      dispatch(setUserProfile({ ...user, token: accessToken }));
      navigate("/dashboard");
    } else {
      const { message, validationRes } = result?.response?.data;
      if (Array.isArray(validationRes?.errors)) {
        setErrMsg(formatApiFormErrors(validationRes?.errors));
      } else {
        setErrMsg(message || "Failed to login");
      }
    }
  };
  return (
    <div className="flex justify-center items-center  h-full min-h-dvh">
      <div className="min-w-72 ">
        <div className="flex justify-center">
          <HospitalLogo className="w-28" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl font-semibold">Login</h1>
          <label>Please login to your account using email and password</label>
        </div>
        <CustomErrorMessage>{errMsg}</CustomErrorMessage>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 pt-3"
        >
          <div className="flex flex-col gap-1">
            <label>Email</label>

            <input
              {...register(formFields.email, {
                required: "Email is required",
                pattern: {
                  value: emailRegex,
                  message: "Please enter a valid email",
                },
              })}
              type="text"
              placeholder="name@example.com"
            />
            {getFormErrMsg(errors, formFields.email)}
          </div>
          <div className="flex flex-col gap-1">
            <label>Password</label>
            <input
              {...register(formFields.password, {
                required: "Password is required",
              })}
              type="password"
              placeholder="••••••••"
            />
            {getFormErrMsg(errors, formFields.password)}
          </div>
          {isBtnLoader ? (
            <LoadingButton>Logging In...</LoadingButton>
          ) : (
            <input className="btn" type="submit" value="Log In" />
          )}
          <Link className="btn btn--border">Forgot Password</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
