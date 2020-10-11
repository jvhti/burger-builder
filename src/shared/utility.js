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

export const inputChangedHandlerFactory = (formState, setFormState, setFormIsValid) => {
  return (ev, inputIdentifier) => {
    const updatedFormElement = updateObject(formState[inputIdentifier], {
      value: ev.target.value,
      touched: true,
      valid: checkValidity(ev.target.value, formState[inputIdentifier].validation)
    });

    const updatedOrderForm = updateObject(formState, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (const identifier in updatedOrderForm)
      formIsValid &= typeof updatedOrderForm[identifier].valid === "undefined" || updatedOrderForm[identifier].valid;

    setFormState({...updatedOrderForm});
    setFormIsValid(!!formIsValid);
  };
}
