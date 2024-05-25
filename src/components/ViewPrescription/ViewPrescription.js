import React, { useState } from "react";
import Modal from "react-responsive-modal";
import { XCircleIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import ReactQuill from "react-quill";
import { useForm, Controller } from "react-hook-form";
import { getFormErrMsg } from "../../utils/utils";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import CustomErrorMessage from "../CustomErrorMessage";
import { formatApiFormErrors } from "../../utils/utils";
import parse from 'html-react-parser';

const formFields = {
  prescription: "prescription",
};
const ViewPrescription = ({ open, close, data, fetchOPList, isEdit }) => {
  const axios = useAxios();
  const [errMsg, setErrMsg] = useState();
  const { prescription, id } = data;
  const parsedPrescription = parse(prescription)
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      prescription,
    },
  });

  const onSubmit = async (form) => {
    const result = await axios
      .patch(`patient/update-prescription/${id}`, form)
      .then((res) => res)
      .catch((err) => err);
    if (result?.data?.status) {
      fetchOPList()
      toast.success(result?.data?.message);
      close();
    } else {
      if (Array.isArray(result?.response?.data?.validationRes?.errors)) {
        setErrMsg(
          formatApiFormErrors(result?.response?.data?.validationRes?.errors)
        );
      } else {
        setErrMsg(result?.response?.data?.message || "Failed");
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
      <div className="min-h-[500px]">
        <div className="flex justify-between gap-5 items-center p-3 border-b">
          <h1 className="text-lg font-medium flex items-center gap-1">
            {data?.patient_name} - Prescription Details
            <span className="text-sm text-gray-600 font-normal">
              ({moment(data.date).format("DD-MM-YYYY HH:MM A")})
            </span>
          </h1>
          <button onClick={close}>
            <XCircleIcon width={20} fill="#db0000" />
          </button>
        </div>
        <CustomErrorMessage>{errMsg}</CustomErrorMessage>
        {
          isEdit ? <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-3">
            <Controller
              name={formFields.prescription}
              control={control}
              render={({ field }) => (
                <ReactQuill className="h-40" theme="snow" {...field} />
              )}
              rules={{
                required: "Prescription cannot be empty",
              }}
            />
          </div>
          <div className="px-5 mt-10">
            {getFormErrMsg(errors, formFields.prescription)}
          </div>
          <div className="mt-1 flex flex-col gap-2 px-5">
            <input type="submit" value="Update Prescription" className="btn" />
            <button className="btn btn--border" onClick={close}>
              Close
            </button>
          </div>
        </form> : <div className="px-5 py-3">
{parsedPrescription}
        </div>
        }
      </div>
    </Modal>
  );
};

export default ViewPrescription;
