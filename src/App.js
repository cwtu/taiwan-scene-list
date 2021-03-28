import { useState, useEffect, useReducer } from "react";
import Scene from "./Scene.js";
import { loadSceneNum, cities, getUrl, reducer } from "./setups.js";

const App = () => {
  const [request, setRequest] = useState("");

  return (
    <>
      <Navbar setRequest={setRequest} />
      <Scenelist request={request} />
    </>
  );
};

const Navbar = ({ setRequest }) => {
  console.log("Navbar");
  return (
    <div id="navbar">
      <h1 id="title">臺灣景點瀏覽</h1>
      <section id="form">
        <button
          onClick={() => {
            setRequest((prevRequest) => "");
            document.getElementById("cities").value = "選擇城市";
          }}
        >
          全部
        </button>
        <select id="cities" defaultValue="選擇城市">
          <option key="default" disabled>
            選擇城市
          </option>
          {cities.map((city) => (
            <option
              key={city[1]}
              value={city[1]}
              onClick={() => setRequest((prevRequest) => city[1])}
            >
              {city[0]}
            </option>
          ))}
        </select>
      </section>
    </div>
  );
};

const initialState = {
  scenes: [],
  isLoading: false,
  isError: false,
};

const Scenelist = ({ request }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("Scenelist");
  // console.log(scenes);

  useEffect(() => {
    var skipCount = 0;
    const fetchScenes = async (request) => {
      dispatch({ type: "PREP_FETCH" });

      try {
        const response = await fetch(getUrl(request, skipCount));
        const newScenes = await response.json();

        skipCount
          ? dispatch({ type: "CON_FETCH", payload: newScenes })
          : dispatch({ type: "INI_FETCH", payload: newScenes });

        if (newScenes.length < loadSceneNum)
          window.removeEventListener("scroll", scrollHandler);

        skipCount += loadSceneNum;
      } catch (e) {
        dispatch({ type: "ERR_FETCH" });
      }
    };

    const scrollHandler = () => {
      if (
        Math.round(window.innerHeight + window.scrollY) >=
        document.body.offsetHeight
      ) {
        fetchScenes(request);
      }
    };

    fetchScenes(request);
    window.addEventListener("scroll", scrollHandler);
    return () => {
      console.log("cleanup");
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [request]);

  return (
    <>
      <ul className="scenelist">
        {state.scenes.map((scene) => (
          <Scene key={scene.ID} {...scene} />
        ))}
        {state.isLoading ? <div id="loading">Loading...</div> : <div></div>}
      </ul>
    </>
  );
};

export default App;
