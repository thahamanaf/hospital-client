import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import HospitalLogo from "../../components/HospitalLogo";
import { useNavigate, Link, useParams } from "react-router-dom";
import { passwordRegex } from "../../utils/regexValues";
import LoadingButton from "../../components/LoadingButton";
import CustomErrorMessage from "../../components/CustomErrorMessage";
import { getFormErrMsg } from "../../utils/utils";
import axios from "../../helpers/axios";
import { formatApiFormErrors } from "../../utils/utils";
import { toast } from "react-toastify";

const formFields = {
  password: "password",
  confirmPassword: "confirmPassword",
};

const ActivateAccount = () => {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onBlur" });
  const navigate = useNavigate();
  const [isBtnLoader, setIsBtnLoader] = useState(false);
  const [errMsg, setErrMsg] = useState();

  const onSubmit = async (data) => {
    setIsBtnLoader(true);
    const result = await axios
      .patch("auth/activate-account", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res)
      .catch((err) => err)
      .finally(() => {
        setIsBtnLoader(false);
      });
      if (result?.data?.status) {
        toast.success(result?.data?.message);
        navigate("/")
      } else {
        if (Array.isArray(result?.response?.data?.validationRes?.errors)) {
          setErrMsg(formatApiFormErrors(result?.response?.data?.validationRes?.errors));
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
          <h1 className="text-xl font-semibold">Activate Account</h1>
          <label>Activate your account by setting new password</label>
        </div>
        <CustomErrorMessage>{errMsg}</CustomErrorMessage>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 pt-3 max-w-72"
        >
          <div className="flex flex-col gap-1">
            <label>Password</label>
            <input
              {...register(formFields.password, {
                required: "Password is required",
                pattern: {
                  value: passwordRegex,
                  message:
                    "Password should be atleast 8 characters, 1 Uppercase, 1 Lowercase, 1 Numeric and 1 Special characters",
                },
              })}
              type="password"
              placeholder="••••••••"
            />
            {getFormErrMsg(errors, formFields.password)}
          </div>
          <div className="flex flex-col gap-1">
            <label>Confirm Password</label>
            <input
              {...register(formFields.confirmPassword, {
                required: "Password is required",

                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords should match!";
                  },
                },
              })}
              type="password"
              placeholder="••••••••"
            />
            {getFormErrMsg(errors, formFields.confirmPassword)}
          </div>
          {isBtnLoader ? (
            <LoadingButton>Activating...</LoadingButton>
          ) : (
            <input className="btn" type="submit" value="Activate account" />
          )}
          <Link to="/" className="btn btn--border">
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ActivateAccount;
