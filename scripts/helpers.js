//* Localstorage'a eleman ekleme
export const setLocal = (key, data) => {
  const strData = JSON.stringify(data);
  localStorage.setItem(key, strData);
};

//todo Kullanıcıyı local'e eklememizin sebebi
//todo ana sayfada da kullanıcı bilgilerine erişmek için ekledik.

//* Localstorage'dan eleman alır
export const getLocal = (key) => {
  const strData = localStorage.getItem(key);
  const data = JSON.parse(strData);
  return data;
};
