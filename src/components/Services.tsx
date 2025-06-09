import React from "react";
import { SERVICES } from "@/constants/services";

const ICONS: Record<string, JSX.Element> = {
  "lock-open": <span role="img" aria-label="Apertura">🔓</span>,
  "key": <span role="img" aria-label="Llave">🔑</span>,
  "settings": <span role="img" aria-label="Cerradura">🛠️</span>,
  "nfc": <span role="img" aria-label="Tag">📶</span>,
  "car-repair": <span role="img" aria-label="Alza Cristales">🚗</span>,
  "clock": <span role="img" aria-label="Emergencia 24h">⏰</span>,
};

const Services = () => (
  <section className="py-16 px-4 bg-white dark:bg-gray-800" id="servicios">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-800 dark:text-blue-200">Nuestros servicios</h2>
    <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
      {SERVICES.map((service) => (
        <div key={service.title} className="flex flex-col items-center bg-blue-50 dark:bg-gray-900 rounded-xl p-6 shadow hover:scale-105 transition-transform">
          <div className="text-5xl mb-4">{ICONS[service.icon]}</div>
          <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-100">{service.title}</h3>
          <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Services;