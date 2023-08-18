import { authEle } from "./ui.js";

// Şifre için kuralları içeren tanım
// min 1 lowercase letter
// min 1 uppercase letter
// min one number
// min eight character
// min one special character
const regex =
  "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$";

//! Uyarıları ekrana basar
const renderWarns = (nameWarn, passWarn) => {
  // İsim uyarısı var ise ekrana bas yok ise html'ini boşalt
  if (nameWarn) {
    authEle.nameArea.innerHTML = `<p class="warning">${nameWarn}</p>`;
  } else {
    authEle.nameArea.innerHTML = "";
  }
  //   Şifre uyarısı varsa ekrana bas yok ise uyarıyı sil
  if (passWarn) {
    authEle.passArea.innerHTML = `<p class="warning">${passWarn}</p>`;
  } else {
    authEle.passArea.innerHTML = "";
  }
};

//* Formun gönderilme olayını izleme
authEle.loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // uyarıları tutacağımız değişkenler
  let nameWarn = null;
  let passWarn = null;

  // değerlere erişme
  const name = authEle.nameInp.value;
  const pass = authEle.passInp.value;

  // name'in içi boş ise,3 karakterden kısa ise,hiçbiri değilse içini null yap(ismi kontrol etme)
  if (!name) {
    nameWarn = "İsim alanı zorunludur.";
  } else if (name.length <= 3) {
    nameWarn = "İsim üç karakterden kısa olamaz.";
  } else {
    nameWarn = null;
  }

  // şifre kontrol etme
  if (!pass) {
    passWarn = "Şifre alanını doldurunuz.";
  } else if (pass.length < 8) {
    passWarn = "Şifre sekiz karakterden kısa olamaz.";
  } else if (!pass.match(regex)) {
    passWarn = "Şifre yeterince güçlü değil.";
  } else {
    passWarn = null;
  }

  // Uyarıları ekrana baas
  renderWarns(nameWarn, passWarn);
  // Formu gönder
  if (!nameWarn && !passWarn) {
    console.log("form gönderildi");
  }
});
