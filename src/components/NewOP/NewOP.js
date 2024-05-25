import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import PatientOPCard from "../PatientOPCard";
import { Select } from "antd";
import ReactQuill from "react-quill";
import { useForm, Controller } from "react-hook-form";
import { getFormErrMsg } from "../../utils/utils";
import useAxios from "../../hooks/useAxios";
import CustomErrorMessage from "../CustomErrorMessage";
import { userRoles } from "../../config/userRoles";
import LoadingButton from "../LoadingButton";
import { toast } from "react-toastify";
import { formatApiFormErrors } from "../../utils/utils";
import { XCircleIcon } from "@heroicons/react/20/solid";


const formFields = {
  prescription: "prescription",
  patiend_id: "patient_id",
  reason: "reason",
  docter_id: "docter_id",
  phone: "phone",
};
const NewOP = ({ open, close, handleOpenNewPatient }) => {
  const axios = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({ mode: "onBlur" });
  const [patient, setPatient] = useState();
  const [errMsg, setErrMsg] = useState();
  const [doctorList, setDoctorList] = useState([]);
  const [isBtnLoader, setIsBtnLoader] = useState(false);
  const [isAddPatientBtn, setIsAddPatientBtn] = useState(false)

  const searchPatientUsingPhone = async () => {
    setErrMsg("");
    setIsAddPatientBtn(false)
    const phone = getValues(formFields.phone);
    if (!phone) {
      return;
    }
    const result = await axios
      .get(`patient/patient-list?phone=${phone}`)
      .then((res) => res)
      .catch((err) => err);
    if (result?.data?.status) {
      setPatient(result?.data?.result[0]);
    } else {
      setIsAddPatientBtn(true)
      setErrMsg("No patient found with this phone number");
    }
  };

  const fetchDoctorList = async (controller) => {
    const result = await axios
      .get(`auth/staff-list?role_id=${userRoles.doctor}&is_active=1`, controller)
      .then((res) => res)
      .catch((err) => err);
    if (result?.data?.status) {
      const list = result?.data?.result.map((item) => ({
        label: `${item.first_name} ${item.last_name}`,
        value: item.id,
      }));
      setDoctorList(list);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchDoctorList({ signal: controller.signal });
    return () => {
      controller.abort();
    };
  }, []);

  const onSubmit = async (data) => {
    setIsBtnLoader(true);
    const result = await axios
      .post(`patient/new-op`, {...data, patient_id: patient.id})
      .then((res) => res)
      .catch((err) => err)
      .finally(() => {
        setIsBtnLoader(false);
      });
    if (result?.data?.status) {
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
      center
      showCloseIcon={false}
    >

      <div className="flex flex-col w-80 p-2">
        <div className="flex justify-between gap-5">
          <h1 className="font-medium text-xl">New OP</h1>
          <button onClick={close}>
            <XCircleIcon width={20} fill="#db0000" />
          </button>
        </div>
        {patient && <PatientOPCard data={patient} />}

        <CustomErrorMessage className="py-2">{errMsg}</CustomErrorMessage>
        { isAddPatientBtn && <button className="btn" type="button" onClick={handleOpenNewPatient}>Add Patient Details</button>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Search Patient with phone number</label>
            <div className="flex gap-2">
              <input
                {...register(formFields.phone, {
                  required: "Enter the patient phone number to search",
                })}
                type="number"
              />{" "}
              <button
                type="button"
                onClick={searchPatientUsingPhone}
                className="btn"
              >
                search
              </button>
            </div>
            {getFormErrMsg(errors, formFields.phone)}
          </div>
          <div className="flex flex-col">
            <label>Select doctor</label>
            <Controller
              name={formFields.docter_id}
              control={control}
              render={({ field }) => <Select {...field} options={doctorList} />}
              rules={{
                required: "Select a doctor",
              }}
            />
            {getFormErrMsg(errors, formFields.docter_id)}
          </div>
          <div className="flex flex-col">
            <label>Reason</label>
            <input
              {...register(formFields.reason, {
                required: "Reason is required",
              })}
              type="text"
            />
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
          <div className="flex flex-col gap-2 mt-20">
            {isBtnLoader ? (
              <LoadingButton>Creating...</LoadingButton>
            ) : (
              <input className="btn" type="submit" value="Create OP" />
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

export default NewOP;
