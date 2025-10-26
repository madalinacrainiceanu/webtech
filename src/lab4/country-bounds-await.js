import fetch from "node-fetch";

async function getObjectFromUrl(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "webtech-lab (contact@student.ro)",
    },
  });
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("serverul nu a trimis json valid. raspuns partial:");
    console.error(text.substring(0, 200));
    throw new Error("serverul nu a returnat json valid.");
  }
}

async function getCountryBounds(country) {
  const object = await getObjectFromUrl(
    `https://nominatim.openstreetmap.org/search?country=${country}&format=json`
  );

  return {
    minLatitude: object[0].boundingbox[0],
    maxLatitude: object[0].boundingbox[1],
    minLongitude: object[0].boundingbox[2],
    maxLongitude: object[0].boundingbox[3],
  };
}

getCountryBounds("Romania").then((bounds) => console.log("Romania:", bounds));
getCountryBounds("France").then((bounds) => console.log("France:", bounds));
