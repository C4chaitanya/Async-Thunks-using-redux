import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import Button from "../components/Button";
import { addUser } from "../store";
import { useThunk } from "../hooks/use-thunk";

export default function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);

  const [doAddUser, isCreatingUser, creatingUsersError] = useThunk(addUser);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleAddUser = () => {
    doAddUser();
  };

  const { data } = useSelector((state) => {
    return state.users;
  });

  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={6} className="w-full h-10" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => {
      return (
        <div key={user.id} className="mt-2 mb-2 rounded border">
          <div className="flex p-2 justify-between items-center cursor-pointer">
            {user.name}
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-2 mt-2">
        <p>My Users :</p>
        <Button
          loading={isCreatingUser}
          className="cursor-pointer"
          onClick={handleAddUser}
        >
          + Add User
        </Button>
        {creatingUsersError && "Error Fetching users data..."}
      </div>
      <div>{content}</div>
    </div>
  );
}
