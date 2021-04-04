import Scene from "./Scene.js";
import { useEffect, useReducer } from "react";
import { loadSceneNum, getUrl, reducer } from "./setups.js";

const initialState = {
  scenes: [],
  isLoading: false,
  isError: false,
};

const Scenelist = ({ request }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    var skipCount = 0;
    const fetchScenes = async (request) => {
      window.removeEventListener("scroll", scrollHandler); // prevent another fetch when loading
      dispatch({ type: "PREP_FETCH" });

      const response = await fetch(getUrl(request, skipCount));
      const newScenes = await response.json();

      if (response.status < 400) {
        skipCount
          ? dispatch({ type: "CON_FETCH", newScenes: newScenes })
          : dispatch({ type: "INI_FETCH", newScenes: newScenes });

        if (newScenes.length === loadSceneNum)
          window.addEventListener("scroll", scrollHandler); // add listener back only when there are more data to fetch

        skipCount += loadSceneNum;
      } else {
        dispatch({ type: "ERR_FETCH", statusText: response.statusText });
      }
    };

    // fetch more when scroll to bottom
    const scrollHandler = () => {
      if (
        Math.round(window.innerHeight + window.scrollY) >=
        document.body.offsetHeight
      ) {
        fetchScenes(request);
      }
    };

    window.addEventListener("scroll", scrollHandler);
    fetchScenes(request); // first fetch
    return () => {
      window.removeEventListener("scroll", scrollHandler); // cleanup
    };
  }, [request]);

  return (
    <>
      {state.isError ? (
        <p id="error">Error: {state.isError}</p>
      ) : (
        <ul className="scenelist">
          {state.scenes.map((scene) => (
            <Scene key={scene.ID} {...scene} />
          ))}
          {state.isLoading && <div id="loading">Loading...</div>}
        </ul>
      )}
    </>
  );
};

export default Scenelist;
