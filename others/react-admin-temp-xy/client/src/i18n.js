import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookie from "js-cookie"; 

i18n
    // load translation using xhr -> see /public/locales
    // learn more: https://github.com/i18next/i18next-xhr-backend
    // .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    // .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources: {
            EN: {
                translations: require("./locale/en.json"),
            },
            CN: {
                translations: require("./locale/zh.json"),
            },
        },
        // fallbackLng: 'zh-CN', // 使用LanguageDetector 取消注释
        fallbackLng: Cookie.get("lang") === "EN" ? "EN" : "CN",
        debug: false,
        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        react: {
            wait: true,
        },
    });

export default i18n;