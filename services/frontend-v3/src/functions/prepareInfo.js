export default prepareInfo;

function prepareInfo(info, language, specialUndefineds) {
  if (specialUndefineds && typeof info === "object") {
    for (const key in specialUndefineds) {
      if (info[key] !== null) {
        delete specialUndefineds[key];
      }
    }
    info = Object.assign(info, specialUndefineds);
  }
  if (typeof info === "object") {
    if (info === null) {
      return info;
    }
    if (Array.isArray(info)) {
      const returnArray = [];
      info.forEach((element) =>
        returnArray.push(prepareInfo(element, language))
      );
      return returnArray;
    }
    if ("en" in info) {
      return info[language];
    }
    const returnObject = {};
    for (const key in info) {
      returnObject[key] = prepareInfo(info[key], language);
    }
    return returnObject;
  }
  return info;
}
