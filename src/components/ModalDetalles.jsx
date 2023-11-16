import { useState } from "react";
import { Dialog } from "@headlessui/react";

function ModalDetalles({ isOpen, onClose, mesa }) {
  // Añade un estado local para controlar si se muestra el modal
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  // Si la prop `isOpen` cambia, actualiza el estado local
  if (isOpen !== isModalOpen) {
    setIsModalOpen(isOpen);
  }

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <>
      {/* Div oscuro para cubrir toda la pantalla */}
      <div
        className={`fixed inset-0 bg-black opacity-50 `}
        // Cierra el modal al hacer clic en el fondo oscuro
      ></div>

      <Dialog
        open={isModalOpen}
        onClose={closeModal} // Cierra el modal al hacer clic en el botón con la "X"
        className="fixed inset-0 flex items-center justify-center"
      >
        <Dialog.Panel className="bg-white p-4 rounded-2xl w-1/4">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-lg font-medium text-gray-800 mb-2">
              Detalles de la Mesa de Exámenes
            </Dialog.Title>
            <button
              onClick={closeModal}
              className="bg-slate-800  text-white rounded-full py-2 px-3 font-bold"
            >
              X
            </button>
          </div>
          <Dialog.Description className="text-sm text-gray-600 mb-4">
            Información adicional sobre la mesa de exámenes.
          </Dialog.Description>

          {/* Muestra aquí los datos adicionales de la mesa */}
          {/* ... (código previo) */}
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default ModalDetalles;
