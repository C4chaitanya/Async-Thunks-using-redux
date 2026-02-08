import { GoX } from "react-icons/go";
import { useThunk } from "../hooks/use-thunk";
import { deleteUser } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

export default function UsersListItem({ user }) {
  const [doDeleteUser, isDeletingUser, deletingUserError] =
    useThunk(deleteUser);

  const handleDeleteUser = (id) => {
    doDeleteUser(id);
  };

  const header = (
    <>
      <Button
        loading={isDeletingUser}
        onClick={() => handleDeleteUser(user.id)}
      >
        <GoX />
      </Button>
      <div>{user.name}</div>
    </>
  );

  return (
    <div>
      <ExpandablePanel header={header}>
        <AlbumsList user={user} />
      </ExpandablePanel>
      {deletingUserError && "Error Deleting User Data..."}
    </div>
  );
}
