import { XMarkIcon } from "@heroicons/react/24/solid";
import { createPortal } from "react-dom";
const NofiModal = ({ onClose, title, children }) => {
  const content = (
    <div
      id="popup-modal"
      className="bg-[rgba(0,0,0,0.1)] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <XMarkIcon className="w-6 h-6 text-gray-950" />
          </button>
          <div className="p-4 md:p-5 text-center ">
            <div className="mt-3">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
  return createPortal(content, document.getElementById("root-modal"));
};

export default NofiModal;
