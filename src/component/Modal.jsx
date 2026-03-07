import React from 'react'

const Modal = ({children, modalOpen, setModalOpen}) => {
  return (
    // back drop
    <>
      <div
        onClick={(e) => setModalOpen(false)}
        className={` fixed inset-0 flex  justify-center items-center transition-colors z-10 ${modalOpen ? "visible bg-black/20" : "invisible"}`}
      >
        {/* modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute transition-all  transition-300 ${modalOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
          >
            {children}
          </div>
        
      </div>
    </>
  );
}

export default Modal