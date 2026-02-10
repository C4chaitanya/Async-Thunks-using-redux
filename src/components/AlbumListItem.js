import ExpandablePanel from "./ExpandablePanel";

const AlbumsListItem = ({ album }) => {
  const header = <div>{album.name}</div>;
  return (
    <div>
      <ExpandablePanel header={header}>Photos for the album...</ExpandablePanel>
    </div>
  );
};

export { AlbumsListItem };
