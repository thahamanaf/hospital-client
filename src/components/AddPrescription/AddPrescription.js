import React from "react";
import Modal from "react-responsive-modal";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import { getFormErrMsg } from "../../utils/utils";

const formFields = {
  doctor: "doctor",
  reason: "reason",
  prescription: "prescription",
};

const AddPrescription = ({ open, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Modal
      open={open}
      onClose={close}
      closeOnOverlayClick={false}
      center
      showCloseIcon={false}
    >
      <div className="min-w-[400px] flex flex-col">
        <div className="flex justify-between items-center gap-5 p-5 border-b">
          <h1>New OP for Patientname</h1>
          <button onClick={close}>
            <XCircleIcon width={20} fill="#db0000" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="flex gap-5 items-center">
            <div className="flex flex-col w-full">
              <label>Doctor</label>
              <Controller
                name={formFields.doctor}
                control={control}
                rules={{
                  required: "Select a doctor",
                }}
                render={({ field }) => (
                  <Select
                    options={[{ label: "doc", value: "doc" }]}
                    {...field}
                  />
                )}
              />
              {getFormErrMsg(errors, formFields.doctor)}
            </div>
            <div className="w-full">
              <label>Reason</label>
              <input
                {...register(formFields.reason, {
                  required: "Reason is required",
                })}
                type="text"
                placeholder="Fever"
              />
              {getFormErrMsg(errors, formFields.reason)}
            </div>
          </div>
          <div className="py-2 ">
            <label>Prescription</label>
            <Controller
              name={formFields.prescription}
              control={control}
              render={({ field }) => (
                <ReactQuill className="h-40" theme="snow" {...field} />
              )}
            />
            {getFormErrMsg(errors, formFields.prescription)}
          </div>
          <div className="flex flex-col gap-3 mt-10">
            <input className="btn" type="submit" value="Create OP" />
            <button className="btn btn--border" onClick={close}>
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddPrescription;
