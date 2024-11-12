import React from "react";

function Form({ setUserInput, placeholder }) {
    function onChange(e) {
        setUserInput(e.target.value);
    }

    return (
        <div>
            <form>
                <input
                    type="text"
                    onChange={onChange}
                    placeholder={placeholder}
                    style={{
                        padding: '10px 15px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        outline: 'none',
                        width: '100%',
                        maxWidth: '350px',
                        fontSize: '16px',
                        transition: 'border-color 0.3s ease',
                        boxSizing: 'border-box',
                        '&:focus': {
                            borderColor: '#f49521',
                            boxShadow: '0 0 5px rgba(244, 149, 33, 0.5)',
                        },
                    }}
                />
            </form>
        </div>
    );
}

export default Form;

