import { GoTrashcan } from "react-icons/go";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { useRemoveAlbumMutation } from "../store";
import PhotosList from "./PhotosList";

const AlbumsListItem = ({ album }) => {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleDeleteAlbum = (album) => {
    removeAlbum(album);
  };

  const header = (
    <div className="flex flex-row items-center gap-2">
      <Button
        className="cursor-pointer"
        onClick={() => handleDeleteAlbum(album)}
        loading={results.isLoading}
      >
        <GoTrashcan></GoTrashcan>
      </Button>
      <h3>{album.name}</h3>
    </div>
  );
  return (
    <div>
      <ExpandablePanel header={header}>
        <PhotosList album={album}></PhotosList>
      </ExpandablePanel>
    </div>
  );
};

export { AlbumsListItem };
