// src/components/Footer.jsx
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-12 mt-16 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-center gap-8">
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight drop-shadow-lg">
            EventManager
          </h2>
          <p className="text-sm text-blue-300 max-w-xs">
            Your ultimate platform to manage, discover and share amazing events seamlessly.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Footer Navigation" className="flex justify-center space-x-8 text-sm font-semibold">
          {["Home", "Events", "About Us", "Blog", "Contact"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase().replace(/\s/g, "")}`}
              className="relative group hover:text-blue-300 transition-colors"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-300 transition-all group-hover:w-full rounded"></span>
            </a>
          ))}
        </nav>

        {/* Social Media */}
        <div className="flex justify-center space-x-6">
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
            <a
              key={idx}
              href="#"
              aria-label="Social Media Link"
              className="p-3 rounded-full bg-blue-700 bg-opacity-40 hover:bg-opacity-70 transition"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto mt-12 border-t border-blue-500 border-opacity-30"></div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-6 px-6 text-center text-blue-300 text-xs select-none">
        © 2025 EventManager. Made with{" "}
        <span role="img" aria-label="heart" className="inline-block animate-pulse text-pink-400">
          ❤️
        </span>{" "}
        by Naman Kaundal.
      </div>
    </footer>
  );
}

export default Footer;
