import React from 'react';

// компонент-контейнер в качестве свойств принимает другие react-элементы
const Row = ({ leftElem, rightElem }) => {
  return (
    <div className="row mb-4">
      <div className="col-md-6">{leftElem}</div>
      <div className="col-md-6">{rightElem}</div>
    </div>
  );
};

export default Row;
