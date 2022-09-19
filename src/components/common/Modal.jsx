import React from "react";

function Modal({
  modalId,
  modalBtnType,
  modalBtnLabel,
  modalBtnClass,
  title,
  header,
  content,
  footer,
}) {
  const btnId = `btn-${modalId}`;
  const closeModalBtnId = `close-btn-${modalId}`;

  const modal = async () => {
    const promisedModal = new Promise((resolve, reject) => {
      const result = document.getElementById(modalId);
      resolve(result);
      reject("an error will be logged");
    });
    const m = await promisedModal;
    return openModal(m);
  };

  const modalBtn = async () => {
    const promisedBtn = new Promise((resolve, reject) => {
      const result = document.getElementById(closeModalBtnId);
      resolve(result);
      reject("an error will be logged");
    });
    const b = await promisedBtn;
    return closeModal(b);
  };

  window.addEventListener("click", clickOutside);

  function openModal(modal) {
    modal.style.display = "block";
  }

  function closeModal() {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
  }

  function clickOutside(e) {
    const modal = document.getElementById(modalId);
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }

  return (
    <React.Fragment>
      {modalBtnType === "icon" ? (
        <i
          type="button"
          className={modalBtnClass}
          id={btnId}
          onClick={modal}
        ></i>
      ) : (
        <button id={btnId} onClick={modal} className={modalBtnClass}>
          {modalBtnLabel}
        </button>
      )}
      <div id={modalId} className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">
              <h2>{title}</h2>
            </div>
            <div
              className="modal-close-btn"
              id={closeModalBtnId}
              onClick={modalBtn}
            >
              &times;
            </div>
          </div>
          <div className="modal-body">
            {header && <p>{header}</p>}
            {content}
          </div>

          <div className="modal-footer">
            <h3>{footer}</h3>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Modal;
