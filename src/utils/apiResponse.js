export const apiResponse = ({
  status,
  code,
  message,
  data = null,
  pagination = null,
  errors = null,
}) => {
  const response = {
    meta: {
      status,
      code,
      message,
      timestamp: new Date().toISOString(),
    },
  };

  if (data !== null) {
    response.data = data;
  }

  if (pagination !== null) {
    response.meta.pagination = pagination;
  }

  if (errors !== null) {
    response.errors = errors;
  }

  return response;
};

export const successResponse = (
  res,
  { code = 200, message, data, pagination }
) => {
  const response = apiResponse({
    status: "success",
    code,
    message,
    data,
    pagination,
  });
  return res.status(code).json(response);
};

export const errorResponse = (res, { code = 500, message, errors }) => {
  const response = apiResponse({
    status: "error",
    code,
    message,
    errors,
  });
  return res.status(code).json(response);
};
