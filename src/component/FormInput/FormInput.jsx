import React from 'react';

const FormInput = ({ label, type, id, name, value, onChange, placeholder }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
        />
    </div>
);

export default FormInput;