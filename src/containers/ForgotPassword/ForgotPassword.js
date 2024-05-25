import React, { useState } from "react";
import HospitalLogo from "../../components/HospitalLogo";
import { useForm } from "react-hook-form";
import { getFormErrMsg } from "../../utils/utils";
import LoadingButton from "../../components/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { emailRegex } from "../../utils/regexValues";
import axios from "../../helpers/axios";
import CustomErrorMessage from "../../components/CustomErrorMessage";
import { formatApiFormErrors } from "../../utils/utils";
import { toast } from "react-toastify";

const formFields = {
  email: "email",
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const navigate = useNavigate();

  const [isBtnLoader, setIsBtnLoader] = useState(false);
  const [errMsg, setErrMsg] = useState();

  const onSubmit = async (data) => {
    setIsBtnLoader(true);
    const result = await axios
      .post("auth/forgot-password", data)
      .then((res) => res)
      .catch((err) => err)
      .finally(() => setIsBtnLoader(false));
    if (result?.data?.status) {
      toast.success(result?.data?.message);
      navigate("/");
    } else {
      if (Array.isArray(result?.response?.data?.validationRes?.errors)) {
        setErrMsg(
          formatApiFormErrors(result?.response?.data?.validationRes?.errors)
        );
      } else {
        setErrMsg(result?.response?.data?.message || "Failed to login");
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
          <h1 className="text-xl font-semibold">Forgot Password</h1>
          <label>
            Don't worry we will send you instructions to reset your password
          </label>
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

          {isBtnLoader ? (
            <LoadingButton>Sending...</LoadingButton>
          ) : (
            <input
              className="btn"
              type="submit"
              value="Send password reset link"
            />
          )}
          <Link to="/" className="btn btn--border">
            Back to login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
