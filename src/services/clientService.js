import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const getAllClients = async () => {
  return await prisma.client.findMany();
};

export const getClientById = async (id) => {
  return await prisma.client.findUnique({
    where: { id },
  });
};

export const getClientByEmail = async (email) => {
  return await prisma.client.findUnique({
    where: { email },
  });
};

export const createClient = async (clientData) => {
  const { name, email, job, rate, status } = clientData;
  const booleanStatus =
    status === "Active" ? true : status === "Inactive" ? false : null;

  return await prisma.client.create({
    data: {
      name,
      email,
      job,
      rate,
      status: booleanStatus,
    },
  });
};

export const updateClient = async (id, clientData) => {
  const { name, email, job, rate, status } = clientData;
  const booleanStatus =
    status === "Active" ? true : status === "Inactive" ? false : null;

  return await prisma.client.update({
    where: { id },
    data: {
      name,
      email,
      job,
      rate,
      status: booleanStatus,
    },
  });
};

export const deleteClient = async (id) => {
  return await prisma.client.delete({
    where: { id },
  });
}

export const searchClients = async (searchTerm) => { 
  return await prisma.client.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
        { job: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}