export const getFormErrMsg = (errors, key) => {
  if (errors?.[key]) {
    return (
      <span className="flex items-center font-semibold tracking-wide text-red-500 text-xs">
        {errors?.[key]?.message || ""}
      </span>
    );
  }
};

export const formatApiFormErrors = (errors) => {
  let message = "";
  if (Array.isArray(errors)) {
    errors.forEach((item, index) => {
      message += `${index + 1}. ${item.msg} (${item.path})`;
    });
  } else {
    message = errors;
  }
  return message;
};
