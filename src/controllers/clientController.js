import * as yup from "yup";
import * as clientService from "../services/clientService.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import {
  validateUniqueEmailForCreate,
  validateUniqueEmailForUpdate,
} from "../utils/apiValidation.js";

const createClientSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  job: yup.string().required("Job is required"),
  rate: yup.number().optional(),
  status: yup.string().oneOf(["Active", "Inactive"]).optional(),
});

const updateClientSchema = yup.object().shape({
  name: yup.string().optional(),
  email: yup.string().email("Invalid email").optional(),
  job: yup.string().optional(),
  rate: yup.number().optional(),
  status: yup.string().oneOf(["Active", "Inactive"]).optional(),
});

export const getClients = async (req, res) => {
  try {
    const searchTerm = req.query.search || "";
    let clients;

    if (searchTerm) {
      clients = await clientService.searchClients(searchTerm);
    } else {
      clients = await clientService.getAllClients();
    }

    successResponse(res, {
      code: 200,
      message: "Clients fetched successfully",
      data: clients,
    });
  } catch (error) {
    errorResponse(res, {
      code: 500,
      message: "Error fetching clients",
      errors: error.message,
    });
  }
};

export const getClientById = async (req, res) => {
  const clientId = req.params.id;

  try {
    const client = await clientService.getClientById(clientId);
    if (!client) {
      return errorResponse(res, {
        code: 404,
        message: "Client not found",
        errors: `No client found with ID ${clientId}`,
      });
    }
    successResponse(res, {
      code: 200,
      message: "Client fetched successfully",
      data: client,
    });
  } catch (error) {
    errorResponse(res, {
      code: 500,
      message: "Error fetching client",
      errors: error.message,
    });
  }
};

export const createClient = async (req, res) => {
  try {
    const clientData = await createClientSchema.validate(req.body, {
      abortEarly: false,
    });

    // Validasi email apakah sudah terdaftar
    await validateUniqueEmailForCreate(req.body.email);

    const newClient = await clientService.createClient(clientData);
    successResponse(res, {
      code: 201,
      message: "Client created successfully",
      data: newClient,
    });
  } catch (error) {
    errorResponse(res, {
      code: 500,
      message: "Error creating client",
      errors: error.message,
    });
  }
};

export const updateClient = async (req, res) => {
  const clientId = req.params.id;

  try {
    const clientData = await updateClientSchema.validate(req.body, {
      abortEarly: false,
    });

    // Hanya validasi email jika field email ada
    if (clientData.email) {
      await validateUniqueEmailForUpdate(clientId, clientData.email);
    }

    const updatedClient = await clientService.updateClient(
      clientId,
      clientData
    );

    if (!updatedClient) {
      return errorResponse(res, {
        code: 404,
        message: "Client not found",
        errors: `No client found with ID ${clientId}`,
      });
    }

    successResponse(res, {
      code: 200,
      message: "Client updated successfully",
      data: updatedClient,
    });
  } catch (error) {
    errorResponse(res, {
      code: 500,
      message: "Error updating client",
      errors: error.message,
    });
  }
};

export const deleteClient = async (req, res) => {
  const clientId = req.params.id;

  try {
    const deletedClient = await clientService.deleteClient(clientId);
    if (!deletedClient) {
      return errorResponse(res, {
        code: 404,
        message: "Client not found",
        errors: `No client found with ID ${clientId}`,
      });
    }

    successResponse(res, {
      code: 200,
      message: "Client deleted successfully",
      data: deletedClient,
    });
  } catch (error) {
    errorResponse(res, {
      code: 500,
      message: "Error deleting client",
      errors: error.message,
    });
  }
};
