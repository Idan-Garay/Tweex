"use client";

import { useEffect, useState } from "react";
const SSO_LOADING = "sso-loading";
export const useLocalStorageLoading = () => {
  localStorage.setItem("sso-loading", "false")
  const [ssoLoading, setSsoLoading] = useState(
    localStorage.getItem("sso-loading") === "true",
  );

  useEffect(() => {
    const handleChange = () => {
      setSsoLoading(localStorage.getItem(SSO_LOADING) === "true");
    };
    window.addEventListener(SSO_LOADING, handleChange);
  }, []);
  return { ssoLoading, setSsoLoading };
};
