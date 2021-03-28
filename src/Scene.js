import { memo } from "react";

const Scene = memo(({ Name, Description, DescriptionDetail, Picture }) => {
  console.log("load scene");
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
