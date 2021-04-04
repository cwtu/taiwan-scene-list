import { memo } from "react";

// only render new scenes
const Scene = memo(({ Name, Description, DescriptionDetail, Picture }) => {
  if (!Description) Description = DescriptionDetail;

  return (
    <li className="scene">
      <h2>{Name}</h2>
      <hr />
      <p className="description">{Description}</p>
    </li>
  );
});

export default Scene;
