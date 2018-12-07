// libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// компонент-контейнер в качестве свойств принимает другие react-элементы
const Row = ({ leftElem, rightElem }) => {
  return (
    <div className="row mb-4">
      <div className="col-md-6">{leftElem}</div>
      <div className="col-md-6">{rightElem}</div>
    </div>
  );
};

// Проверка типов с помощью библиотеки PropTypes
Row.propTypes = {
  leftElem: PropTypes.node,
  rightElem: PropTypes.node
};

export default Row;
