import { useState, useCallback } from "react";

export default function useFormValidation() {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleInput = useCallback((event) => {
    const input = event.target;
    const form = input.closest("form");

    const message =
      input.validity.patternMismatch && input.dataset.errorMessage
        ? input.dataset.errorMessage
        : input.validationMessage;

    setErrors((previousErrors) => ({
      ...previousErrors,
      [input.name]: message,
    }));
    setIsValid(form.checkValidity());
  }, []);

  const resetValidation = useCallback((validity = false) => {
    setErrors({});
    setIsValid(validity);
  }, []);

  return { errors, isValid, handleInput, resetValidation };
}
