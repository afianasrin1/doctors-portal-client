import React from "react";

const ConfirmModal = ({ title, message }) => {
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
            <label htmlFor="confirm-modal" className="btn btn-primary">
              Yes
            </label>
            <label htmlFor="confirm-modal" className="btn btn-warning">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
