import React from "react";

const Footer = () => (
  <footer className="w-full py-6 px-4 bg-blue-900 text-white text-center mt-8">
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
      <span>&copy; {new Date().getFullYear()} Cerrajería Flejes. Todos los derechos reservados.</span>
      <nav className="flex gap-4 text-blue-200 text-sm">
        <a href="#servicios" className="hover:underline">Servicios</a>
        <a href="#sobre-nosotros" className="hover:underline">Sobre nosotros</a>
        <a href="#contacto" className="hover:underline">Contacto</a>
      </nav>
    </div>
  </footer>
);

export default Footer;