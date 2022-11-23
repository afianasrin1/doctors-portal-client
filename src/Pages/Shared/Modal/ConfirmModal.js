import React from "react";

const ConfirmModal = ({
  title,
  message,
  closeModal,
  modalData,
  successButtonName,
  successAction,
}) => {
  return (
    <div>
      {/* The button to open modal */}
      {/* <label htmlFor="confirm-modal" className="btn">open modal</label> eita jekhane  delete btn shekhane  tar poriborte bashabo */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirm-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label
              onClick={() => successAction(modalData)}
              htmlFor="confirm-modal"
              className="btn btn-primary"
            >
              {successButtonName}
            </label>
            <button onClick={closeModal} className="btn btn-outline">
              close button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
