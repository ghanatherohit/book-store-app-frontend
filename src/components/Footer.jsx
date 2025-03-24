import React from "react";
import footerLogo from "../assets/footer-logo.png";
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate()
    return (
        <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white pt-10 pb- px-6 w-full" >
            <div className="container mx-auto max-w-7xl">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between gap-12">
                    {/* Left Side - Logo and Nav */}
                    <div className="flex flex-col md:flex-row gap-8 md:w-1/2 w-full">
                        <div className="flex justify-center md:justify-start">
                            <img 
                                src={footerLogo} 
                                alt="Logo" 
                                className="w-40 mb-4 filter drop-shadow-lg hover:opacity-90 transition-opacity" 
                            />
                        </div>
                        <nav className="flex items-center justify-center md:justify-start">
                            <ul className="flex flex-wrap gap-8 justify-center md:justify-start">
                                {["Home", "Services", "About Us", "Contact"].map((item) => (
                                    <li key={item}>
                                        <a 
                                            className="text-gray-200 hover:text-pink-300 transition-colors duration-1000 text-sm md:text-base relative after:absolute after:w-0 after:h-0.5 after:bg-pink-300 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Right Side - Newsletter and Social */}
                    <div className="md:w-1/2 w-full">
                        <h3 className="text-xl font-semibold mb-4 text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-cyan-300">
                            Stay Connected
                        </h3>
                        <p className="mb-6 text-gray-200 text-center md:text-left">
                            Subscribe to our newsletter for the latest updates, news and offers.
                        </p>
                        
                        <form className="mb-8">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    className="rounded-lg px-4 py-3 w-full bg-indigo-800/40 border border-purple-500/30 focus:border-pink-400 outline-none transition-all text-white placeholder:text-gray-300"
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 font-medium text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                        
                        {/* Social Media Icons */}
                        <div className="flex gap-8 justify-center md:justify-start">
                            {[
                                { icon: <FaFacebookF size={22} />, url: "https://facebook.com", color: "bg-blue-600" },
                                { icon: <FaXTwitter size={22} />, url: "https://twitter.com", color: "bg-black" },
                                { icon: <FaInstagram size={22} />, url: "https://instagram.com", color: "bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`${social.color} w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-all duration-300 transform hover:-translate-y-1 shadow-lg`}
                                    aria-label={`Visit our ${social.url.split('//')[1].split('.')[0]} page`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Bottom Copyright Section */}
                <div className="mt-12 pt-6 border-t border-purple-500/30 text-center text-sm text-gray-300 pb-4">
                    <p>© {new Date().getFullYear()} BookStore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
