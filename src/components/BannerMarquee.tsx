"use client";
import React, { useEffect, useState } from "react";

const BannerMarquee = () => {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetch("/api/banner")
      .then(res => res.json())
      .then(data => setMensaje(data.mensaje || ""));
  }, []);

  if (!mensaje) return null;

  return (
    <div className="w-full bg-yellow-400 text-black font-bold text-lg py-2 overflow-hidden relative">
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
};

export default BannerMarquee;