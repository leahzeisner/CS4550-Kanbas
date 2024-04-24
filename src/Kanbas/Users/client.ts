import axios from "axios";
import { USERS_API } from "../constants";
import { User } from "../types";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const login = async (credentials: User) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/login`,
    credentials
  );
  return response.data;
};

export const signup = async (user: { username: string; password: string }) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const updateUser = async (user: any, isCurrentUser: boolean) => {
  const data = {
    user,
    isCurrentUser,
  };
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    data
  );
  return response.data;
};

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(`${USERS_API}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}`, user);
  return response.data;
};

export const deleteUser = async (user: any) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/${user._id}`
  );
  return response.data;
};
