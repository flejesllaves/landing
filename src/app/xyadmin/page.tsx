"use client";
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

interface Message {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
  createdAt: string;
  telefono?: string;
}

function setSessionCookie(value: string) {
  document.cookie = `admin_session=${value}; path=/; max-age=86400`;
}
function getSessionCookie() {
  return document.cookie.split(";").some(c => c.trim().startsWith("admin_session=true"));
}
function clearSessionCookie() {
  document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (getSessionCookie()) {
      setLogged(true);
      fetchMessages();
    }
    // eslint-disable-next-line
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (res.ok) {
      setSessionCookie("true");
      setLogged(true);
      fetchMessages();
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    clearSessionCookie();
    setLogged(false);
    setUsername("");
    setPassword("");
    setMessages([]);
    setError("");
  };

  const fetchMessages = async () => {
    const res = await fetch("/api/messages");
    if (res.ok) {
      setMessages(await res.json());
    }
  };

  // Filtrado de mensajes (fecha robusta)
  const filteredMessages = messages.filter(msg => {
    const matchesSearch =
      msg.nombre.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.mensaje.toLowerCase().includes(search.toLowerCase());
    let matchesDate = true;
    if (date) {
      // Usar la fecha local de Uruguay en formato YYYY-MM-DD
      const msgDate = DateTime.fromISO(msg.createdAt).setZone("America/Montevideo").toFormat("yyyy-MM-dd");
      matchesDate = msgDate === date;
    }
    return matchesSearch && matchesDate;
  });

  // --- DISEÑO ---
  const bgGradient = "bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950";
  const cardBg = "bg-blue-900/80 border border-blue-800 shadow-xl";
  const inputStyle = "bg-blue-950/60 border border-blue-700 text-blue-100 placeholder-blue-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400";
  const buttonStyle = "bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-full transition-colors";
  const labelStyle = "text-blue-200 font-semibold";

  if (!logged) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bgGradient}`}>
        <form onSubmit={handleLogin} className={`${cardBg} p-8 rounded-2xl w-full max-w-sm flex flex-col gap-4`}>
          <h2 className="text-2xl font-bold mb-2 text-center text-blue-100">Panel administrador</h2>
          <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} className={inputStyle} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className={inputStyle} required />
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          <button type="submit" className={buttonStyle} disabled={loading}>{loading ? "Ingresando..." : "Ingresar"}</button>
        </form>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgGradient} p-6`}>
      <div className={`max-w-3xl mx-auto ${cardBg} rounded-2xl p-6`}>
        <div className="flex justify-between items-center mb-4">
          <a
            href="https://ads.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow transition-colors"
          >
            Ir a Google Ads
          </a>
          <button onClick={handleLogout} className="ml-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full shadow transition-colors">Cerrar sesión</button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mb-6 items-end justify-end">
          <div className="text-blue-200 text-sm text-right">
            <div><span className="font-semibold">Teléfonos:</span> <a href="tel:+59894640180" className="underline hover:text-blue-400 ml-1">094-640-180</a> <span className="mx-1">|</span> <a href="tel:+59895678649" className="underline hover:text-blue-400">095-678-649</a></div>
          </div>
        </div>
        <form
          className="mb-4 flex flex-col sm:flex-row gap-2 items-center justify-end"
          onSubmit={async e => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = form.elements.namedItem("banner") as HTMLInputElement;
            const res = await fetch("/api/banner", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ mensaje: input.value }),
            });
            if (res.ok) alert("Banner actualizado");
          }}
        >
          <input
            name="banner"
            type="text"
            placeholder="Mensaje del banner (marquee)"
            className={inputStyle + " flex-1 font-semibold"}
            style={{ minWidth: 0 }}
          />
          <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-4 py-2 rounded transition-colors">Actualizar banner</button>
        </form>
        {/* Vista previa del banner */}
        <BannerPreview />
        <h2 className="text-2xl font-bold mb-4 text-blue-100">Mensajes recibidos</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre, email o mensaje"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={inputStyle + " flex-1"}
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className={inputStyle}
          />
        </div>
        {filteredMessages.length === 0 ? (
          <div className="text-blue-300">No hay mensajes.</div>
        ) : (
          <ul className="divide-y divide-blue-800">
            {filteredMessages.map(msg => (
              <li key={msg.id} className="py-4">
                <div className="font-semibold text-blue-200">{msg.nombre} &lt;{msg.email}&gt;{msg.telefono && <span className="ml-2 text-blue-300">({msg.telefono})</span>}</div>
                <div className="text-blue-100 mb-1">{msg.mensaje}</div>
                <div className="text-xs text-blue-400">{DateTime.fromISO(msg.createdAt).setZone("America/Montevideo").toFormat("dd/MM/yyyy HH:mm")}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function BannerPreview() {
  const [mensaje, setMensaje] = useState("");
  useEffect(() => {
    fetch("/api/banner")
      .then(res => res.json())
      .then(data => setMensaje(data.mensaje || ""));
  }, []);
  if (!mensaje) return null;
  return (
    <div className="w-full bg-yellow-400 text-black font-bold text-lg py-2 overflow-hidden relative mb-6 rounded">
      <div className="marquee whitespace-nowrap animate-marquee px-4">
        {mensaje}
      </div>
      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}