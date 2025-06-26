"use client";

import React, { useState } from "react";

const Contact = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, telefono, mensaje }),
    });
    setLoading(false);
    if (res.ok) {
      setStatus("¡Mensaje enviado correctamente!");
      setNombre("");
      setEmail("");
      setTelefono("");
      setMensaje("");
    } else {
      setStatus("Ocurrió un error al enviar el mensaje. Intenta nuevamente.");
    }
  };

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-800" id="contacto">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800 dark:text-blue-200">Contacto</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">¿Necesitás ayuda urgente o querés consultar por un servicio? Escribinos o llamanos, ¡estamos para ayudarte!</p>
        <div className="flex flex-col gap-2 mb-8">
          <span>
            <a href="tel:+59895678649" className="text-blue-700 hover:underline font-semibold mr-2 flex items-center inline-block">
              📞 <span className="ml-1">095-678-649</span>
            </a>
            <a href="https://wa.me/59895678649" target="_blank" rel="noopener noreferrer" className="ml-2 align-middle" title="WhatsApp">
              <img src="/image.png" alt="WhatsApp" style={{ display: 'inline', width: '1.3em', height: '1.3em', verticalAlign: 'middle' }} />
            </a>
          </span>
          <span>
            <a href="tel:+59895034680" className="text-blue-700 hover:underline font-semibold mr-2 flex items-center inline-block">
              📞 <span className="ml-1">095-034-680 <span className="text-xs text-gray-500">(16hs a 00)</span></span>
            </a>
            <a href="https://wa.me/59895034680" target="_blank" rel="noopener noreferrer" className="ml-2 align-middle" title="WhatsApp">
              <img src="/image.png" alt="WhatsApp" style={{ display: 'inline', width: '1.3em', height: '1.3em', verticalAlign: 'middle' }} />
            </a>
          </span>
          <span>
            <a href="tel:+59891717522" className="text-blue-700 hover:underline font-semibold flex items-center inline-block">
              📞 <span className="ml-1">091-717-522</span>
            </a>
          </span>
        </div>
        <form className="flex flex-col gap-4 items-center" name="contacto" autoComplete="off" onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Tu nombre" className="w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required value={nombre} onChange={e => setNombre(e.target.value)} />
          <input type="email" name="email" placeholder="Tu email" className="w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required value={email} onChange={e => setEmail(e.target.value)} />
          <input type="tel" name="telefono" placeholder="Tu número de contacto" className="w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required value={telefono} onChange={e => setTelefono(e.target.value)} />
          <textarea name="mensaje" placeholder="¿En qué podemos ayudarte?" className="w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} required value={mensaje} onChange={e => setMensaje(e.target.value)} />
          <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-8 rounded-full shadow transition-colors" disabled={loading}>{loading ? "Enviando..." : "Enviar mensaje"}</button>
        </form>
        {status && <div className={`mt-4 text-lg ${status.startsWith("¡Mensaje") ? "text-green-600" : "text-red-600"}`}>{status}</div>}
      </div>
    </section>
  );
};

export default Contact;