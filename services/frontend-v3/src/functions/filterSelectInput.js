/**
 * Helps filtering search inputs while disregarding accents and casing
 * https://stackoverflow.com/a/37511463/11006837
 * 
 * @param {string} input Search input value
 * @param {Object} option Option data from ant design
 *
 * @returns {boolean} Returns trus if the input is found in the option data
 */
export default (input, option) =>
  option.children
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .includes(
      input
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
    );
