import React from 'react';

function InputField({ label, id, error, multiline = false, ...props }) {
  return (
    <div className="input-field">
      {label && <label htmlFor={id} className="input-field__label">{label}</label>}
      {multiline ? (
        <textarea id={id} className="input-field__textarea" {...props} />
      ) : (
        <input id={id} className="input-field__input" {...props} />
      )}
      {error && <span className="input-field__error">{error}</span>}
    </div>
  );
}

export default InputField;
