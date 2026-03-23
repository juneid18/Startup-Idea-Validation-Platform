import { useState } from "react";

const validators = {
  name: (v) =>
    v.trim().length >= 2 ? "" : "Name must be at least 2 characters.",
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address.",
  password: (v) =>
    v.length >= 8 ? "" : "Password must be at least 8 characters.",
  confirmPassword: (v, fields) =>
    v === fields.password ? "" : "Passwords do not match.",
};

export function useAuthForm(initialFields) {
  const [fields,   setFields]   = useState(initialFields);
  const [errors,   setErrors]   = useState({});
  const [touched,  setTouched]  = useState({});
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const fn  = validators[name];
      const err = fn ? fn(value, { ...fields, [name]: value }) : "";
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fn  = validators[name];
    const err = fn ? fn(value, fields) : "";
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(fields).forEach((key) => {
      const fn  = validators[key];
      const err = fn ? fn(fields[key], fields) : "";
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    setTouched(
      Object.keys(fields).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    );
    return Object.keys(newErrors).length === 0;
  };

  return {
    fields, errors, touched, loading, apiError,
    setLoading, setApiError, handleChange, handleBlur, validate,
  };
}