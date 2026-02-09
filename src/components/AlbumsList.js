import { useFetchAlbumsQuery } from "../store";

function AlbumsList({ user }) {
  const results = useFetchAlbumsQuery();

  console.log(results);

  return <div>Albums created by: {user.name}</div>;
}

export default AlbumsList;
