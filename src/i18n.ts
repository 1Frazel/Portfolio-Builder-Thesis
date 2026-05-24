import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationID from "./locales/id/translation.json";

const savedLanguage =
  typeof window !== "undefined"
    ? window.localStorage.getItem("language")
    : null;

const resources = {
  en: {
    common: translationEN.common,
    homepage: translationEN.homepage,
    creationPage: translationEN.creationPage,
    resumeCheckerPage: translationEN.resumeCheckerPage,
  },
  id: {
    common: translationID.common,
    homepage: translationID.homepage,
    creationPage: translationID.creationPage,
    resumeCheckerPage: translationID.resumeCheckerPage,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage?.startsWith("en") ? "en" : "id",
  fallbackLng: "id",
  ns: ["common", "homepage", "creationPage", "resumeCheckerPage"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (language) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("language", language);
  }
});

export default i18n;