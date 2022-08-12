import Script from "next/script";

export const pageview = (url) => {
    window.gtag("config", "G-2PRL8SJ7PM", {
        page_path: url,
    });
};

export const event = ({ action, category, label, value }) => {
    window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};


export const Scripts = () => (
    <>
        <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=G-2PRL8SJ7PM`}
            id="g1"
        />
        <Script
            id="g2"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-2PRL8SJ7PM', {
                    page_path: window.location.pathname,
                    });
                `,
            }}
        />
    </>)