import { useCreateAlbumMutation, useFetchAlbumsQuery } from "../store";
import { AlbumsListItem } from "./AlbumListItem";
import Button from "./Button";
import Skeleton from "./Skeleton";

function AlbumsList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user.id);

  const [addAlbum, results] = useCreateAlbumMutation();

  let content;
  if (isFetching) {
    content = (
      <div>
        <Skeleton className="h-10 w-full" times={3} />
      </div>
    );
  } else if (error) {
    content = <div>Error fetching Albums...</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }

  const handleCreateAlbum = () => {
    addAlbum(user.id);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div>Albums created by: {user.name}</div>
        <Button onClick={handleCreateAlbum} loading={results.isLoading}>
          + Add Album
        </Button>
      </div>
      <div className="p-10">{content}</div>
    </div>
  );
}

export default AlbumsList;
