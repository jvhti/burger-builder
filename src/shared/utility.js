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

export const inputChangedHandlerFactory = (obj, statePropertyName) => {
  return (ev, inputIdentifier) => {
    const updatedFormElement = updateObject(obj.state[statePropertyName][inputIdentifier], {
      value: ev.target.value,
      touched: true,
      valid: checkValidity(ev.target.value, obj.state[statePropertyName][inputIdentifier].validation)
    });

    const updatedOrderForm = updateObject(obj.state[statePropertyName], {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (const inputIdentifier in updatedOrderForm)
      formIsValid &= typeof updatedOrderForm[inputIdentifier].valid === "undefined" || updatedOrderForm[inputIdentifier].valid;

    obj.setState({[statePropertyName]: updatedOrderForm, formIsValid: !!formIsValid});
  };
}
