import Styles from './Input.module.css';

function Input({type, text, name, placeholder, handleOnChange, value, multiple}) {
    return(
        <div className={Styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                onChange={handleOnChange} 
                value={value} 
                {...(multiple ? {multiple} : '')}
            />
        </div>
    );
};

export default Input;