import React from "react";
import Modal from "react-responsive-modal";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useForm, Controller } from "react-hook-form";
import { Select } from "antd";
import { getFormErrMsg } from "../../utils/utils";
import { genderOptions } from "../../utils/commonSelectBoxOptions";

const formFields = {
  firstName: "first_name",
  lastName: "last_name",
  age: "age",
  mobile: "mobile",
  gender: "gender",
  place: "place",
};

const AddPatient = ({ open, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ mode: "onBlur" });

  const onSubmit = () => {};
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
                render={({ field }) => <Select options={genderOptions} {...field} />}
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
            <input type="submit" className="btn" value="Create Patient" />
            <button onClick={close} className="btn btn--border">Close</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddPatient;
