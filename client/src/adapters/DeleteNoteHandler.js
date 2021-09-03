import React from "react";
import instance from "./AxiosInstance";

export default async function DeleteNote(id) {
  const token = localStorage.getItem("accessToken");
  console.log(id);
  try {
    const response = await instance.delete(`journals/${id}`, {
      headers: {
        "x-access-token": token,
      },
    });
    const data = await response;
    return response.status;
  } catch (error) {
    console.error(error);
  }
}
