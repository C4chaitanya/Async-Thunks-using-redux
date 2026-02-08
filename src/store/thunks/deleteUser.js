import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await axios.delete(`http://localhost:3005/users/${id}`);

  await pause(1000);

  return id;
});

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { deleteUser };
