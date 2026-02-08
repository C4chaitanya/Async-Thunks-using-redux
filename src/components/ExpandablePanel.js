import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";

function ExpandablePanel({ header, children }) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mt-2 mb-2 rounded border">
      <div className="flex p-2 gap-3 items-center">
        {header}
        <div className="cursor-pointer ml-auto" onClick={handleClick}>
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className="p-2 border-t-1">{children}</div>}
    </div>
  );
}

export default ExpandablePanel;
