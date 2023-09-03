import {
  mainEle,
  renderInfo,
  renderLoader,
  renderTimeline,
  renderUserInfo,
  renderEmrtyInfo,
  renderUserPage,
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
  const path = location.search.split("/")[0];
  const userName = location.search.split("/")[1];
  const id = window.location.hash.replace("#", "");
  const user = getLocal("user");

  // kullanıcı local de yok ise çalışır
  if (!user) {
    location = "/auth.html";
  }
  // kullanıcı ana sayfadaysa çalışır
  if (!path) {
    // ekrana loading'i basar
    renderLoader(mainEle.tweetsArea);

    // anasayfa da gösterilecek tweetleri alma
    const data = await api.fetchData(
      "/timeline.php",
      "screenname",
      user.profile
    );
    // tweetleri ekrana basma
    renderTimeline(user, data.timeline, mainEle.tweetsArea);
  }

  // status sayfasındaysa ve id bulunuyorsa tweet detaylarını al ekrna bas
  if (path === "?status" && id) {
    //apiden cevabı beklemeden arayüzü hazırla
    renderEmrtyInfo();
    // api'a istek atar
    const info = await api.fetchData("/tweet.php", "id", id);
    // tweet detaylarını ekrana basar
    renderInfo(info, userName);
  }
  // arama kısmı
  if (path === "?search" && id) {
    // ekrana loading bas
    renderLoader(mainEle.main);
    // aratılan içerikle ilgili tweetler
    const data = await api.fetchData("/search.php", "query", id);

    // tweetleri ekrana aktarma
    renderTimeline(null, data.timeline, mainEle.main);
  }
  //hesap detay alanı
  if (path === "?user" && id) {
    // kullanıcı bilgilerini al ve renderla
    renderLoader(mainEle.main);

    const userInfo = await api.getUser(id);
    renderUserPage(userInfo);

    //* kullanıcı tweetlerini al ve ekrana renderla
    // tweetleri göndereceğimiz yeri çağırma
    const outlet = document.querySelector(".user-tweets");
    // ekrana loader basma
    renderLoader(outlet);
    // kullanıcnın tweetlere erişme
    const userTweets = await api.fetchData("/timeline.php", "screenname", id);
    // tweetleri ekrana basma
    renderTimeline(userInfo, userTweets.timeline, outlet);
  }
};

//* detay alanını ekrana bas
["hashchange", "load"].forEach((event) => {
  window.addEventListener(event, controlURL);
});

//* arama formunu gönderilmesi
mainEle.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // inputun verisine erişme
  const query = e.target[0].value;
  // arama sayfasına yönlendirme
  location = `?search#${query}`;
});

//* geri butonuna tıklanma olayını izleme
mainEle.main.addEventListener("click", (e) => {
  // geri butonuna tıklandıysa
  if (e.target.classList.contains("bi-arrow-left")) {
    // geçmişte bir adım geriye gitmesini sağlar
    history.back();
  }
});
