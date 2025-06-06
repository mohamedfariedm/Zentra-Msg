import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { get, map } from "lodash";

//i18n
import i18n from "../../i18n";
import languages from "../../common/languages";


const LanguageDropdown = () => {
    // Declare a new state variable, which we'll call "menu"
    const [selectedLang, setSelectedLang] = useState("");

    useEffect(() => {
        const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
        setSelectedLang(currentLanguage);
    }, []);

    const changeLanguageAction = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("I18N_LANGUAGE", lang);
        setSelectedLang(lang);
      
        const isRTL = lang === "ar";
        document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
      
        const existingRtlLink = document.getElementById("rtl-style");
        if (isRTL) {
          if (!existingRtlLink) {
            const link = document.createElement("link");
            link.id = "rtl-style";
            link.rel = "stylesheet";
            link.href = `${process.env.PUBLIC_URL}/rtl.css`;
            document.head.appendChild(link);
          }
        } else {
          if (existingRtlLink) {
            existingRtlLink.remove();
          }
        }
      };
      


    const [isLanguageDropdown, setIsLanguageDropdown] = useState(false);
    const toggleLanguageDropdown = () => {
        setIsLanguageDropdown(!isLanguageDropdown);
    };
    return (
        <React.Fragment>
            <Dropdown isOpen={isLanguageDropdown} toggle={toggleLanguageDropdown} className="ms-1 topbar-head-dropdown header-item">
                <DropdownToggle className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle shadow-none" tag="button">
                    <img
                        src={get(languages, `${selectedLang}.flag`)}
                        alt="Header Language"
                        height="20"
                        className="rounded"
                    />
                </DropdownToggle>
                <DropdownMenu className="notify-item language py-2">
                    {map(Object.keys(languages), key => (
                        <DropdownItem
                            key={key}
                            onClick={() => changeLanguageAction(key)}
                            className={`notify-item ${selectedLang === key ? "active" : "none"
                                }`}
                        >
                            <img
                                src={get(languages, `${key}.flag`)}
                                alt="Skote"
                                className="me-2 rounded"
                                height="18"
                            />
                            <span className="align-middle">
                                {get(languages, `${key}.label`)}
                            </span>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default LanguageDropdown;