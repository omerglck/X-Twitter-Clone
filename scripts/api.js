const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "17bfa31bbbmsh1355592a7405f9bp1dd229jsnd7e87c1e1260",
    "X-RapidAPI-Host": "twitter-api45.p.rapidapi.com",
  },
};
const baseURL = "https://twitter-api45.p.rapidapi.com";

export class API {
  constructor() {}
  // Kullanıcının deteylarını alma
  async getUser(userName) {
    try {
      const res = await fetch(
        `https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${userName}`,
        options
      );
      const data = res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  //diğer api
  async fetchData(endpoint, paramName, paramValue) {
    try {
      // parametre olarak gelen linke
      // yeni parametre olarak gelen url parametresine istek atma
      const res = await fetch(
        `${baseURL}${endpoint}?${paramName}=${paramValue}`,
        options
      );
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
