import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { get, map } from "lodash";

// i18n
import i18n from "../../i18n";
import languages from "../../common/languages";

const LanguageDropdownRectangle = () => {
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

    const [isLanguageDropdownRectangle, setIsLanguageDropdownRectangle] = useState(false);
    const toggleLanguageDropdownRectangle = () => {
        setIsLanguageDropdownRectangle(!isLanguageDropdownRectangle);
    };

    return (
        <React.Fragment>
            <Dropdown
                isOpen={isLanguageDropdownRectangle}
                toggle={toggleLanguageDropdownRectangle}
                className="ms-1 w-100 d-flex justify-content-center align-items-center topbar-head-dropdown header-item"
            >
                <DropdownToggle
                    className="btn btn-icon btn-topbar btn-ghost-secondary w-50 shadow-none"
                    tag="button"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '50%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        backgroundColor: '#fff',
                        color: '#333',
                    }}
                >
                    <span style={{ flexGrow: 1, paddingLeft: '10px', textAlign: 'left' }}>
                        {get(languages, `${selectedLang}.label`)}
                    </span>
                    <img
                        src={get(languages, `${selectedLang}.flag`)}
                        alt="Header Language"
                        height="18"
                        style={{
                            marginLeft: '10px',
                            borderRadius: '50%',
                        }}
                    />
                </DropdownToggle>

                <DropdownMenu
                    className="notify-item language py-2"
                    style={{
                        width: '50%',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        marginTop: '5px',
                        backgroundColor: '#fff',
                    }}
                >
                    {map(Object.keys(languages), key => (
                        <DropdownItem
                            key={key}
                            onClick={() => changeLanguageAction(key)}
                            className={`notify-item ${selectedLang === key ? "active" : "none"}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                backgroundColor: selectedLang === key ? '#f0f0f0' : 'transparent',
                            }}
                        >
                            <img
                                src={get(languages, `${key}.flag`)}
                                alt="Flag"
                                height="18"
                                style={{
                                    marginRight: '10px',
                                    borderRadius: '50%',
                                }}
                            />
                            <span>{get(languages, `${key}.label`)}</span>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default LanguageDropdownRectangle;
