import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../interface";
import axios from "axios";

const user: User[] = [];

// Fetch all users
export const getUser: any = createAsyncThunk("users/getAllUser", async () => {
  const res = await axios.get("http://localhost:8080/user");
  return res.data;
});

// Add new user
export const addUser: any = createAsyncThunk("user/addUser", async (user) => {
  const res = await axios.post(`http://localhost:8080/user`, user);
  return res.data;
});

// Delete user
export const deleteUser: any = createAsyncThunk(
  "users/deleteUser",
  async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    return id;
  }
);

// Edit user
export const editUser: any = createAsyncThunk(
  "users/editUser",
  async ({ id, text }: { id: number; text: string }) => {
    const res = await axios.put(`http://localhost:8080/user/${id}`, {
      name: text,
    });
    return res.data;
  }
);

const userReducer = createSlice({
  name: "listUser",
  initialState: {
    user: user,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state: any) => {
        // Trạng thái chờ
      })
      .addCase(getUser.fulfilled, (state: any, action: any) => {
        // Thực hiện thành công
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state: any) => {
        // Thực hiện không thành công
      })
      .addCase(addUser.fulfilled, (state: any, action: any) => {
        state.user.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state: any, action: any) => {
        console.log(action.payload);
        state.user = state.user.filter(
          (item: any) => item.id !== action.payload
        );
      })
      .addCase(editUser.fulfilled, (state: any, action: any) => {
        const index = state.user.findIndex(
          (item: any) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.user[index] = action.payload;
        }
      });
  },
});

export default userReducer.reducer;
