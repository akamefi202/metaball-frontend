import React, { useEffect, useState } from "react";
// reactstrap components
import { Button, Modal } from "reactstrap";

const CommonAddEditModal = ({ open, isEditable, data }) => {
  const { title, toggle, formValue, formFields } = data;
  const [formData, setFormData] = useState({ formValue });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={open}
      toggle={() => toggle()}
    >
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          {title}
        </h5>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => toggle()}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <div>
          {formFields.map((field, index) => (
            <div class={"row " + index}>
              <div class="col">
                <div class="form-group">
                  <label class="form-control-label" for={`input-${field}`}>
                    {field}
                  </label>
                  <input
                    id={`input-${field}`}
                    placeholder={field}
                    type="text"
                    class="form-control-alternative form-control"
                    value={formData[field]}
                    name={field}
                    onChange={handleChange}
                    disable={isEditable}
                  />
                </div>
              </div>
            </div>
          ))}
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label class="form-control-label" for="input-email">
                  Email address
                </label>
                <input
                  id="input-email"
                  placeholder="jesse@example.com"
                  type="email"
                  class="form-control-alternative form-control"
                  value={formData["email"]}
                  name="email"
                  onChange={handleChange}
                  disable={isEditable}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <Button
          color="secondary"
          data-dismiss="modal"
          type="button"
          onClick={() => toggle()}
        >
          Close
        </Button>
        <Button color="primary" type="button">
          Save changes
        </Button>
      </div>
    </Modal>
  );
};

export default CommonAddEditModal;
