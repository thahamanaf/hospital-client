import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Modal from "react-responsive-modal";
import { getFormErrMsg } from "../../utils/utils";
import "react-responsive-modal/styles.css";
import { Select } from "antd";
import { userRoleOptions } from "../../utils/commonSelectBoxOptions";
import { emailRegex } from "../../utils/regexValues";
import LoadingButton from "../LoadingButton";
import useAxios from "../../hooks/useAxios";
import CustomErrorMessage from "../CustomErrorMessage";
import { formatApiFormErrors } from "../../utils/utils";
import { toast } from "react-toastify";

const formFields = {
  firstName: "first_name",
  lastName: "last_name",
  email: "email",
  role: "role_id",
};

const AddStaff = ({ open, close, fetchStaffList }) => {
  const axios = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ mode: "onBlur" });

  const [isBtnLoader, setIsBtnLoader] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = async (data) => {
    setErrMsg("");
    setIsBtnLoader(true);
    const result = await axios
      .post("auth/register", data)
      .then((res) => res)
      .catch((err) => err)
      .finally(() => {
        setIsBtnLoader(false);
      });
    if (result?.data?.status) {
      fetchStaffList();
      toast.success(result?.data?.message);
      close();
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
    <Modal
      onClose={close}
      open={open}
      closeOnOverlayClick={false}
      showCloseIcon={false}
      center
    >
      <div className="flex flex-col min-w-[300px]">
        <div className="flex justify-between items-center pb-2 border-b p-5">
          <h1 className="font-medium">Add Staff</h1>
          <button onClick={close}>
            <XCircleIcon width={20} fill="#db0000" />
          </button>
        </div>
        <div className="px-3">
          <CustomErrorMessage>{errMsg}</CustomErrorMessage>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-3">
          <div className="sm:flex gap-5">
            <div className="flex flex-col w-full">
              <label>First name</label>
              <input
                {...register(formFields.firstName, {
                  required: "First name is required",
                })}
                type="text"
              />
              {getFormErrMsg(errors, formFields.firstName)}
            </div>
            <div className="flex flex-col w-full">
              <label>Last name</label>
              <input
                {...register(formFields.lastName, {
                  required: "Last name is required",
                })}
                type="text"
              />
              {getFormErrMsg(errors, formFields.lastName)}
            </div>
          </div>
          <div className="sm:flex gap-5">
            <div className="flex flex-col w-full">
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
              />
              {getFormErrMsg(errors, formFields.email)}
            </div>
            <div className="flex flex-col w-full">
              <label>Role</label>
              <Controller
                name={formFields.role}
                control={control}
                render={({ field }) => (
                  <Select {...field} options={userRoleOptions} />
                )}
                rules={{
                  required: "Select the user role",
                }}
              />
              {getFormErrMsg(errors, formFields.role)}
            </div>
          </div>
          <div className="flex flex-col gap-2 py-3">
            {isBtnLoader ? (
              <LoadingButton>Creating user...</LoadingButton>
            ) : (
              <input type="submit" value="Create user" className="btn" />
            )}

            <button onClick={close} type="button" className="btn btn--border">
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddStaff;
