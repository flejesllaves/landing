import React from "react";
import Image from "next/image";

const Hero = () => (
  <section className="w-full flex flex-col items-center justify-center py-8 px-4 bg-gradient-to-b from-blue-100 to-white dark:from-blue-900 dark:to-gray-900 text-center">
    <Image src="/llavemaestra.png" alt="Logo Flejes Cerrajeros" width={400} height={400} className="mb-2 rounded-full shadow-lg" priority />
    <h1 className="text-4xl md:text-6xl font-bold mb-2 text-blue-800 dark:text-blue-200">Cerrajería LLave Maestra</h1>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="#contacto" className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-colors">Solicitar servicio</a>
      <a href="https://wa.me/59895678649" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-colors flex items-center gap-2">
        <img src="/image.png" alt="WhatsApp" style={{ width: '1.5em', height: '1.5em', display: 'inline', verticalAlign: 'middle', filter: 'brightness(0) invert(1)' }} />
        WhatsApp
      </a>
    </div>
    <div className="mt-4 flex flex-row items-center justify-center gap-8 text-blue-800 dark:text-blue-200 text-2xl font-extrabold">
      <span>🚨 <a href="tel:+59895678649" className="underline hover:text-blue-600">095-678-649</a></span>
      <span>🚨 <a href="tel:+59895034680" className="underline hover:text-blue-600">095-034-680</a></span>
      <span>🚨 <a href="tel:+59891717522" className="underline hover:text-blue-600">091-717-522</a></span>
    </div>
  </section>
);

export default Hero;