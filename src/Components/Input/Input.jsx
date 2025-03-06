const Input = ({ label, type, id, placeholder, value, onChange }) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
