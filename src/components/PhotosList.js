import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import PhotoListItem from "./PhotoListItem";

const PhotosList = ({ album }) => {
  const { data, error, isFetching } = useFetchPhotosQuery(album);

  const [addPhoto, results] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;
  if (isFetching) {
    return <Skeleton times={3} className="h-10 w-full"></Skeleton>;
  } else if (error) {
    return <div>Error fetching Photos..</div>;
  } else {
    content = data.map((photo) => {
      return <PhotoListItem key={photo.id} photo={photo}></PhotoListItem>;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div>Photos in Album {album?.name}</div>
        <Button loading={results.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="flex flex-row">{content}</div>
    </div>
  );
};

export default PhotosList;
