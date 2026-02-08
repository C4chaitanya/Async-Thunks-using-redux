import { GoX } from "react-icons/go";
import { useThunk } from "../hooks/use-thunk";
import { deleteUser } from "../store";
import Button from "./Button";

export default function UsersListItem({ user }) {
  const [doDeleteUser, isDeletingUser, deletingUserError] =
    useThunk(deleteUser);

  const handleDeleteUser = (id) => {
    doDeleteUser(id);
  };

  return (
    <div>
      <div key={user.id} className="mt-2 mb-2 rounded border">
        <div className="flex p-2 gap-3 items-center cursor-pointer">
          <Button
            loading={isDeletingUser}
            onClick={() => handleDeleteUser(user.id)}
          >
            <GoX />
          </Button>
          {deletingUserError && "Error Deleting User Data..."}
          <div>{user.name}</div>
        </div>
      </div>
    </div>
  );
}
