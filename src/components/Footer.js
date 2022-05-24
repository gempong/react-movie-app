import React from "react";

import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";

function Footer(){
    return(
        <footer className="py-32 bg-slate-100">
            <div className="container mx-auto text-center">
                <div className="social-media mb-9">
                    <ul className="flex list-none justify-center">
                        <li><a href="/" className="mx-6 text-2xl"><FacebookOutlined /></a></li>
                        <li><a href="/" className="mx-6 text-2xl"><InstagramOutlined /></a></li>
                        <li><a href="/" className="mx-6 text-2xl"><TwitterOutlined /></a></li>
                        <li><a href="/" className="mx-6 text-2xl"><YoutubeOutlined /></a></li>
                    </ul>
                </div>
                <div className="social-media mb-9">
                    <ul className="flex list-none justify-center">
                        <li><a href="/" className="text-gray-900 mx-6 text-lg">Conditions of Use</a></li>
                        <li><a href="/" className="text-gray-900 mx-6 text-lg">Privacy & Policy</a></li>
                        <li><a href="/" className="text-gray-900 mx-6 text-lg">Press Room</a></li>
                    </ul>
                </div>
                <p className="text-lg text-gray-500">© 2021 MovieBox. All Right Reserved.  </p>
            </div>
        </footer>
    )
}

export default Footer;