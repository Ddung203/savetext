export function removeSpacesAndSpecialChars(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "");
}
