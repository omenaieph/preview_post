"use client";

import CookieConsent from "react-cookie-consent";

export function CookieBanner() {
    return (
        <CookieConsent
            location="bottom"
            buttonText="I understand"
            cookieName="previewpost_cookie"
            style={{ background: "#09090b", borderTop: "1px solid #27272a" }}
            buttonStyle={{
                background: "#ffffff",
                color: "#000000",
                fontSize: "13px",
                borderRadius: "4px",
                fontWeight: "600"
            }}
            expires={150}
        >
            We use cookies to enhance the user experience and analyze traffic.{" "}
        </CookieConsent>
    );
}
