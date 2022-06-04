import React from "react";

import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";

function Footer() {
    return (
        <footer className="xl:py-32 py-10 bg-slate-100">
            <div className="container mx-auto text-center xl:px-0 px-4">
                <div className="social-media mb-9">
                    <ul className="flex list-none justify-center p-0">
                        <li><a href="/" className="mx-6 xl:text-2xl text-xl"><FacebookOutlined /></a></li>
                        <li><a href="/" className="mx-6 xl:text-2xl text-xl"><InstagramOutlined /></a></li>
                        <li><a href="/" className="mx-6 xl:text-2xl text-xl"><TwitterOutlined /></a></li>
                        <li><a href="/" className="mx-6 xl:text-2xl text-xl"><YoutubeOutlined /></a></li>
                    </ul>
                </div>
                <div className="social-media mb-9">
                    <ul className="flex xl:flex-row flex-col list-none justify-center p-0">
                        <li><a href="/" className="text-gray-900 xl:mx-6 xl:mb-0 mx-0 mb-4 block xl:text-lg text-sm">Conditions of Use</a></li>
                        <li><a href="/" className="text-gray-900 xl:mx-6 xl:mb-0 mx-0 mb-4 block xl:text-lg text-sm">Privacy & Policy</a></li>
                        <li><a href="/" className="text-gray-900 xl:mx-6 xl:mb-0 mx-0 mb-4 block xl:text-lg text-sm">Press Room</a></li>
                    </ul>
                </div>
                <p className="xl:text-lg text-sm text-gray-500">© 2021 MovieBox. All Right Reserved.  </p>
            </div>
        </footer>
    )
}

export default Footer;