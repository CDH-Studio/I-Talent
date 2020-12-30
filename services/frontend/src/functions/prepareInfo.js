function prepareInfo(
  unassignableInfo,
  language,
  unassignableSpecialUndefineds
) {
  let info;

  if (unassignableSpecialUndefineds && typeof unassignableInfo === "object") {
    const specialUndefineds = { ...unassignableSpecialUndefineds };

    Object.keys(specialUndefineds).forEach((key) => {
      if (unassignableInfo[key] !== null) {
        delete specialUndefineds[key];
      }
    });

    info = Object.assign(unassignableInfo, specialUndefineds);
  } else {
    info = unassignableInfo;
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
    if ("ENGLISH" in info) {
      return info[language];
    }
    const returnObject = {};
    Object.keys(info).forEach((key) => {
      returnObject[key] = prepareInfo(info[key], language);
    });
    return returnObject;
  }
  return info;
}

export default prepareInfo;
