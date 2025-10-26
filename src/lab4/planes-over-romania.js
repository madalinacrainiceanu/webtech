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

async function getPlanesOverCountry(country) {
  const bounds = await getCountryBounds(country);
  const url = `https://opensky-network.org/api/states/all?lamin=${bounds.minLatitude}&lomin=${bounds.minLongitude}&lamax=${bounds.maxLatitude}&lomax=${bounds.maxLongitude}`;

  const data = await getObjectFromUrl(url);

  if (!data.states) {
    console.log("nu s-au putut obtine date despre avioane");
    return;
  }

  console.log(`numar de avioane deasupra ${country}: ${data.states.length}`);

  data.states.slice(0, 5).forEach((plane, i) => {
    console.log(
      `#${i + 1}: ${plane[1]} (${plane[2]}) - altitudine: ${plane[13]}`
    );
  });
}

getPlanesOverCountry("Romania");
