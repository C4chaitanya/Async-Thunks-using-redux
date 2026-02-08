import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";
import Button from "../components/Button";
import { addUser } from "../store";

export default function UsersList() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(false);

  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUsersError, setCreatingUsersError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      .catch((err) => setLoadingUsersError(err))
      .finally(() => setIsLoadingUsers(null));
  }, [dispatch]);

  const handleAddUser = () => {
    setIsCreatingUser(true);
    dispatch(addUser())
      .unwrap()
      .catch((err) => {
        setCreatingUsersError(err);
      })
      .finally(() => {
        setIsCreatingUser(false);
      });
  };

  const { data } = useSelector((state) => {
    return state.users;
  });

  if (isLoadingUsers) {
    return <Skeleton times={6} className="w-full h-10" />;
  }

  if (loadingUsersError) {
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
        {isCreatingUser ? (
          "Loaing user..."
        ) : (
          <Button primary className="cursor-pointer" onClick={handleAddUser}>
            + Add User
          </Button>
        )}
        {creatingUsersError && "Error Fetching users data..."}
      </div>
      <div>{renderedListOfUsers}</div>
    </div>
  );
}
