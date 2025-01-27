'use client'

import { useState, useEffect } from "react";

export default function InAppBrowserBanner() {
    const [isInApp, setIsInApp] = useState(false);
    const [copyClicked, setCopyClicked] = useState(false);

    useEffect(() => {
        const isInAppBrowser = () =>  {
        const ua = navigator.userAgent || navigator.vendor;
        return (
            ua.includes("Instagram") ||
            ua.includes("Snapchat") ||
            ua.includes("FBAV") || // Facebook
            ua.includes("FBAN")    // Facebook Messenger
        );}
        const inAppBrowser = isInAppBrowser();
        if(inAppBrowser != isInApp){
            setIsInApp(inAppBrowser);
        }
    },[isInApp]);
    

    return (
        <>
            {isInApp && 
                <div className="bg-yellow-200 text-center">
                    <a
                    className="text-center text-black">
                        Schedule exporting features don't work with in-app browsers.
                        For best experience, open the link using your internet browser app.
                    </a>
                </div>
            }
        </>
    )
}