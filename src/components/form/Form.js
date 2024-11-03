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
                    style={{ color: 'gray' }}
                />
            </form>
        </div>
    );
}

export default Form;
