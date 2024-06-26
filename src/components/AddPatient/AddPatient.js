import React, { useState } from "react";
import Modal from "react-responsive-modal";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useForm, Controller } from "react-hook-form";
import { Select } from "antd";
import { getFormErrMsg } from "../../utils/utils";
import { genderOptions } from "../../utils/commonSelectBoxOptions";
import useAxios from "../../hooks/useAxios";
import CustomErrorMessage from "../CustomErrorMessage";
import { formatApiFormErrors } from "../../utils/utils";
import { toast } from "react-toastify";
import LoadingButton from "../LoadingButton";

const formFields = {
  firstName: "first_name",
  lastName: "last_name",
  age: "age",
  mobile: "phone",
  gender: "gender",
  place: "place",
};

const AddPatient = ({ open, close, fetchPatientList }) => {
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
      .post("patient/create-patient", data)
      .then((res) => res)
      .catch((err) => err)
      .finally(() => {
        setIsBtnLoader(false);
      });
    if (result?.data?.status) {
      fetchPatientList && fetchPatientList();
      toast.success(result?.data?.message);
      close();
    } else {
      if (Array.isArray(result?.response?.data?.validationRes?.errors)) {
        setErrMsg(
          formatApiFormErrors(result?.response?.data?.validationRes?.errors)
        );
      } else {
        setErrMsg(result?.response?.data?.message || "");
      }
    }
  };
  return (
    <Modal
      open={open}
      onClose={close}
      closeOnOverlayClick={false}
      showCloseIcon={false}
      center
    >
      <div className="flex flex-col min-w-[300px]">
        <div className="flex justify-between p-5 border-b">
          <h1 className="font-medium">Add Patient</h1>
          <button onClick={close}>
            <XCircleIcon width={20} fill="#db0000" />
          </button>
        </div>
        <CustomErrorMessage>{errMsg}</CustomErrorMessage>
        <form
          className="flex flex-col gap-2 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="sm:flex gap-3">
            <div className="w-full">
              <label>First name</label>
              <input
                {...register(formFields.firstName, {
                  required: "First name is required",
                })}
                type="text"
              />
              {getFormErrMsg(errors, formFields.firstName)}
            </div>
            <div className="w-full">
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
          <div className="sm:flex gap-3">
            <div className="w-full">
              <label>Age</label>
              <input
                {...register(formFields.age, {
                  required: "Age is required",
                })}
                type="number"
              />
              {getFormErrMsg(errors, formFields.age)}
            </div>
            <div className="w-full">
              <label>Mobile</label>
              <input
                {...register(formFields.mobile, {
                  required: "Mobile number is required",
                })}
                type="number"
              />
              {getFormErrMsg(errors, formFields.mobile)}
            </div>
          </div>
          <div className="sm:flex gap-3">
            <div className="w-full flex flex-col">
              <label>Gender</label>
              <Controller
                control={control}
                name={formFields.gender}
                rules={{
                  required: "Gender is required",
                }}
                render={({ field }) => (
                  <Select options={genderOptions} {...field} />
                )}
              />
              {getFormErrMsg(errors, formFields.gender)}
            </div>
            <div className="w-full">
              <label>Place</label>
              <input
                {...register(formFields.place, {
                  required: "Place is required",
                })}
                type="text"
              />
              {getFormErrMsg(errors, formFields.place)}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {isBtnLoader ? (
              <LoadingButton>Creating...</LoadingButton>
            ) : (
              <input type="submit" className="btn" value="Create Patient" />
            )}

            <button onClick={close} className="btn btn--border">
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddPatient;
