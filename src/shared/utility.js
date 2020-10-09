export const updateObject = (oldObject, newProperties) => ({...oldObject, ...newProperties});

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) return true;

  if (rules.required) {
    isValid &= value.trim() !== '';
  }

  if (rules.minLength) {
    isValid &= value.length >= rules.minLength;
  }

  if (rules.matchesRegEx) {
    isValid &= value.match(rules.matchesRegEx) !== null;
  }

  return !!isValid;
}
