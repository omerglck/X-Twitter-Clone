import { mainEle, renderUserInfo } from "./scripts/ui.js";
import { getLocal } from "./scripts/helpers.js";
//! Olay İzleyicileri
//* Sayfanın yüklenme anı
document.addEventListener("DOMContentLoaded", () => {
  const user = getLocal("user");
  renderUserInfo(user);
  console.log(mainEle.pics, user);
});
//* Çıkış butonuna tıklama
mainEle.logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location = "/auth.html";
});
