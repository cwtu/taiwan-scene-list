export const loadSceneNum = 30; // max = 5185

export const cities = [
  ["臺北市", "Taipei"],
  ["新北市", "NewTaipei"],
  ["桃園市", "Taoyuan"],
  ["臺中市", "Taichung"],
  ["臺南市", "Tainan"],
  ["高雄市", "Kaohsiung"],
  ["基隆市", "Keelung"],
  ["新竹市", "Hsinchu"],
  ["新竹縣", "HsinchuCounty"],
  ["苗栗縣", "MiaoliCounty"],
  ["彰化縣", "ChanghuaCounty"],
  ["南投縣", "NantouCounty"],
  ["雲林縣", "YunlinCounty"],
  ["嘉義縣", "ChiayiCounty"],
  ["嘉義市", "Chiayi"],
  ["屏東縣", "PingtungCounty"],
  ["宜蘭縣", "YilanCounty"],
  ["花蓮縣", "HualienCounty"],
  ["臺東縣", "TaitungCounty"],
  ["金門縣", "KinmenCounty"],
  ["澎湖縣", "PenghuCounty"],
  ["連江縣", "LienchiangCounty"],
];

export function getUrl(city = null, skip = 0) {
  var url = "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot";

  url =
    url +
    (city ? "/" + city + "?" : "?") +
    "$top=" +
    loadSceneNum +
    "&$skip=" +
    skip +
    "&$format=JSON";

  return url;
}
export const reducer = (state, action) => {
  switch (action.type) {
    case "PREP_FETCH": {
      return { ...state, isError: false, isLoading: true };
    }
    case "INI_FETCH": {
      window.scrollTo(0, 0);
      return {
        ...state,
        scenes: action.payload,
        isLoading: false,
      };
    }
    case "CON_FETCH": {
      return {
        ...state,
        scenes: state.scenes.concat(action.payload),
        isLoading: false,
      };
    }
    case "ERR_FETCH": {
      return { ...state, isError: true };
    }
    default: {
      throw new Error("Unhandled action type");
    }
  }
};
