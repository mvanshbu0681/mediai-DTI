import React from "react";
import { useTranslation } from "react-i18next";

const language = [
  { code: "en", lang: "English" },
  { code: "hi", lang: "Hindi" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="btn-container flex gap-4">
      {language.map((lng) => (
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            lng.code === i18n.language
              ? "bg-purple-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          key={lng.code}
          onClick={() => changeLanguage(lng.code)}
        >
          {lng.lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
