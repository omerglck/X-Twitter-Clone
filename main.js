import {
  mainEle,
  renderInfo,
  renderLoader,
  renderTimeline,
  renderUserInfo,
  renderEmrtyInfo,
} from "./scripts/ui.js";
import { getLocal } from "./scripts/helpers.js";
import { API } from "./scripts/api.js";

const api = new API();
//! Olay İzleyicileri
//* Sayfanın yüklenme anı
document.addEventListener("DOMContentLoaded", async () => {
  //localden kullanıcı bilgilerini alıp ekrana renderlama
  const user = getLocal("user");
  renderUserInfo(user);

  // ekrana loading'i basar
  renderLoader(mainEle.tweetsArea);

  // anasayfa da gösterilecek tweetleri alma
  const data = await api.fetchData("/timeline.php", "screenname", user.profile);
  // tweetleri ekrana basma
  renderTimeline(user, data.timeline);
});
//* Çıkış butonuna tıklama
mainEle.logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location = "/auth.html";
});

//* Hem sayfa yüklendiğinde hem hasthag kısmı değiştiğiğnde

const controlURL = async (e) => {
  //kullanıcının konumuna erişme
  // const path = window.location.search;
  const id = window.location.hash.replace("#", "");
  // status sayfasındaysa ve id bulunuyorsa tweet detaylarını al ekrna bas
  if (id) {
    //apiden cevabı beklemeden arayüzü hazırla
    renderEmrtyInfo();
    // api'a istek atar
    const info = await api.fetchData("/tweet.php", "id", id);
    // tweet detaylarını ekrana basar
    renderInfo(info);
  }
};

//* detay alanını ekrana bas
["hashchange", "load"].forEach((event) => {
  window.addEventListener(event, controlURL);
});
