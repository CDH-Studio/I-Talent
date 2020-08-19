const uniEng = [
  "Other post-secondary institution (outside Canada)",
  "Other university outside Canada",
];

const uniFr = [
  "Autres établissements postsecondaires (à l’extérieur du Canada)",
  "Autre université située à l’extérieur du Canada",
];

let json = {
  abbrProvince: "",
  schools: [],
};

if (uniEng.length === uniFr.length)
  uniEng.forEach((value, index) => {
    json.schools.push({
      en: value,
      fr: uniFr[index],
    });
  });

console.log(json);
