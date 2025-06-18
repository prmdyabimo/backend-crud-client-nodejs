import * as clientService from "../services/clientService.js";

export const validateUniqueEmailForUpdate = async (clientId, newEmail) => {
  const existingClient = await clientService.getClientById(clientId);
  if (!existingClient) {
    throw new Error(`No client found with ID ${clientId}`);
  }

  // If email is unchanged, allow
  if (existingClient.email === newEmail) return;

  // Check if email already used by another client
  const clientWithEmail = await clientService.getClientByEmail(newEmail);
  if (clientWithEmail) {
    throw new Error("Email is already used by another client");
  }
};

export const validateUniqueEmailForCreate = async (email) => {
  const existingClient = await clientService.getClientByEmail(email);
  if (existingClient) {
    throw new Error("Email is already used by another client");
  }
};
