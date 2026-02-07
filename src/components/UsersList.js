import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import Button from "../components/Button";
import { addUser } from "../store";

export default function UsersList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    dispatch(addUser());
  };

  const { isLoading, data, error } = useSelector((state) => {
    return state.users;
  });

  if (isLoading) {
    return <Skeleton times={6} className="w-full h-10" />;
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }

  const renderedListOfUsers = data.map((user) => {
    return (
      <div key={user.id} className="mt-2 mb-2 rounded border">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-2 mt-2">
        <p>My Users :</p>
        <Button primary className="cursor-pointer" onClick={handleAddUser}>
          + Add User
        </Button>
      </div>
      <div>{renderedListOfUsers}</div>
    </div>
  );
}
