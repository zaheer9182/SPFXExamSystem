import * as React from 'react';
//import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { PrimaryButton } from '@fluentui/react';

interface MarksModelProps {
    marksObtained: number;
    totalmarks: number;
    model: boolean;
    showModel: (updateModel: any) => void;
  }

  const MarksModel: React.FC<MarksModelProps> = ({ marksObtained, totalmarks,model, showModel}) => {

  const handleClose = () => showModel(false);

  console.log(model);

  return (
    <>
      <Modal show={model} onHide={handleClose} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <div style={{ marginBottom: '10px' }}>
    <strong>Total Marks:</strong> {totalmarks}
  </div>
  <div>
    <strong>Marks Obtained:</strong> {marksObtained}
  </div>
  <div>
  <strong>Percentage:</strong> {((marksObtained / totalmarks) * 100).toFixed(2)}%
  </div>
</Modal.Body>

        <Modal.Footer>
          <PrimaryButton type="submit" onClick={handleClose} >
            Submit
          </PrimaryButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MarksModel;
