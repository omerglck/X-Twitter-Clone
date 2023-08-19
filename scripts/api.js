const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "17bfa31bbbmsh1355592a7405f9bp1dd229jsnd7e87c1e1260",
    "X-RapidAPI-Host": "twitter-api45.p.rapidapi.com",
  },
};

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
}
