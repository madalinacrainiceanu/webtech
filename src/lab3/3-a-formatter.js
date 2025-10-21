const formatString = (s, ...format) => {
  let modified = s;
  for (let i = 0; i < format.length; i++) {
    if (modified.indexOf("{" + i + "}") !== -1) {
      modified = modified.replace("{" + i + "}", format[i]);
    }
  }
  return modified;
};

console.log(
  formatString("this is a {0} string  and we've {1} it ", "nice", "modified")
);

const formatNamedString = (s, values) => {
  let modified = s;
  for (const key in values) {
    const placeholder = `{${key}}`;
    if (modified.includes(placeholder)) {
      modified = modified.replace(placeholder, values[key]);
    }
  }
  return modified;
};

const template = "un {substantiv} este {adjectiv}";
const result = formatNamedString(template, {
  substantiv: "căluț",
  adjectiv: "drăguț",
});

console.log(result);
// Output: "un căluț este drăguț"
