import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import ModalAdmin from "../modals/ModalAdmin";
import ModalAlmacenamiento from "../modals/ModalAlmacenamiento";
import ModalVentas from "../modals/ModalVentas";
import UserManager from "../../user/layout/UserManager";

const Homepage: React.FC = () => {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showAlmacenamientoModal, setShowAlmacenamientoModal] = useState(false);
  const [showVentasModal, setShowVentasModal] = useState(false);
  const [currentView, setCurrentView] = useState<"home" | "userManager">(
   () => "home"
  );

  const handleAlmacenamientoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Accediendo a almacenamiento...");
    setShowAlmacenamientoModal(false);
  };

  const handleVentasSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Accediendo a ventas...");
    setShowVentasModal(false);
  };

  const handleAdminLoginSuccess = () => {
    setShowAdminModal(false);
    setCurrentView("userManager");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  if (currentView === "userManager") {
    return <UserManager onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-[#e8fcee] p-6">
      {/* Header con más elementos */}
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary rounded-full flex justify-center items-center shadow-lg">
            <i className="bx bx-wrench text-2xl text-white"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Ferretería TECNOMARKET S.A.C
            </h2>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <i className="bx bx-map text-primary"></i>
              Av. mariscal castilla Av Santa Rosa
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex justify-center items-center cursor-pointer hover:bg-primary/30 transition-colors">
            <i className="bx bx-bell text-primary text-xl"></i>
          </div>
          <div
            className="w-12 h-12 text-white text-2xl font-bold bg-primary rounded-full flex justify-center items-center shadow-lg hover:shadow-xl cursor-pointer relative 
                hover:scale-110 hover:bg-primary/90 hover:rotate-12 hover:border-2 hover:border-white/30 
                transform-gpu transition-all duration-300 ease-in-out"
            onClick={() => setShowAdminModal(true)}
          >
            A
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Company Name con badge */}
        <div className="relative mb-8">
          <div className="px-16 py-7 text-5xl font-bold bg-primary text-white rounded-2xl shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
            TECNOMARKET S.A.C
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <i className="bx bx-star text-white text-sm"></i>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md border">
            <span className="text-sm font-semibold text-primary flex items-center gap-1">
              <i className="bx bx-time"></i>
              Abierto ahora
            </span>
          </div>
        </div>

        {/* Central Icon con estadísticas */}
        <div className="relative mb-12">
          <div className="w-48 h-48 bg-primary rounded-full flex justify-center items-center shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white/30 relative">
            <img
              src={logo}
              alt="Ferretería Logo"
              className="w-40 h-40 object-cover rounded-full"
            />

            {/* Elementos flotantes alrededor */}
            <div className="absolute -top-2 -left-2 w-16 h-16 bg-green-200 rounded-full flex items-center justify-center shadow-md">
              <i className="bx bx-hash text-green-700 text-lg"></i>
            </div>
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-green-200 rounded-full flex items-center justify-center shadow-md">
              <i className="bx bx-trending-up text-green-700 text-lg"></i>
            </div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-green-200 rounded-full flex items-center justify-center shadow-md">
              <i className="bx bx-check-circle text-green-700 text-lg"></i>
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-green-200 rounded-full flex items-center justify-center shadow-md">
              <i className="bx bx-group text-green-700 text-lg"></i>
            </div>
          </div>
        </div>

        {/* Mini estadísticas */}
        <div className="grid grid-cols-3 gap-6 mb-8 w-full max-w-2xl">
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100 text-center">
            <i className="bx bx-package text-3xl text-primary mb-2"></i>
            <p className="text-sm text-gray-600">Productos</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100 text-center">
            <i className="bx bx-cart-alt text-3xl text-primary mb-2"></i>
            <p className="text-sm text-gray-600">Ventas Hoy</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100 text-center">
            <i className="bx bx-dollar-circle text-3xl text-primary mb-2"></i>
            <p className="text-sm text-gray-600">Ingresos</p>
          </div>
        </div>

        {/* Solo dos botones como pediste */}
        <div className="flex flex-row justify-center items-center w-full gap-12 max-w-2xl">
          <button
            className="flex-1 bg-primary text-white text-xl py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group"
            onClick={() => setShowAlmacenamientoModal(true)}
          >
            <div className="flex items-center justify-center gap-3">
              <i className="bx bx-package text-2xl group-hover:scale-110 transition-transform"></i>
              <span className="font-semibold">Almacenamiento</span>
            </div>
          </button>

          <button
            className="flex-1 bg-primary text-white text-xl py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group"
            onClick={() => setShowVentasModal(true)}
          >
            <div className="flex items-center justify-center gap-3">
              <i className="bx bx-cart-alt text-2xl group-hover:scale-110 transition-transform"></i>
              <span className="font-semibold">Ventas</span>
            </div>
          </button>
        </div>
      </div>
      <ModalAdmin
        showModal={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      <ModalAlmacenamiento
        showModal={showAlmacenamientoModal}
        onClose={() => setShowAlmacenamientoModal(false)}
        onSubmit={handleAlmacenamientoSubmit}
      />

      <ModalVentas
        showModal={showVentasModal}
        onClose={() => setShowVentasModal(false)}
        onSubmit={handleVentasSubmit}
      />
    </div>
  );
};

export default Homepage;
