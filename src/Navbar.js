import { cities } from "./setups.js";

const Navbar = ({ setRequest }) => {
  return (
    <div id="navbar">
      <h1 id="title">臺灣景點瀏覽</h1>
      <section id="form">
        <button
          onClick={() => {
            setRequest("");
            document.getElementById("cities").value = "選擇城市";
          }}
        >
          全部
        </button>
        <select
          id="cities"
          defaultValue="選擇城市"
          onChange={() => {
            const select = document.getElementById("cities");
            setRequest(select.value);
          }}
        >
          <option key="default" disabled>
            選擇城市
          </option>
          {cities.map((city) => (
            <option
              key={city[1]}
              value={city[1]}
              onClick={() => setRequest(city[1])}
            >
              {city[0]}
            </option>
          ))}
        </select>
      </section>
    </div>
  );
};

export default Navbar;
