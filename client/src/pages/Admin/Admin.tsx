import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  editUser,
  getUser,
} from "../../store/reducers/user";

export default function Admin() {
  const getData = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleAdd = () => {
    const newUser = {
      name: "Xuan Nhat New",
    };
    dispatch(addUser(newUser));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (item: any) => {
    setId(item.id);
    setText(item.name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const submitChange = () => {
    if (id !== null) {
      dispatch(editUser({ id, text }));
    }
  };

  return (
    <div>
      <button onClick={handleAdd}>Add User</button>
      <input onChange={handleChange} type="text" value={text} />
      <button onClick={submitChange}>Change</button>
      <ul>
        {getData.map((item: any) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDelete(item.id)}>Delete User</button>
            <button onClick={() => handleEdit(item)}>Edit User</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
