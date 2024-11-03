import React from "react";

function Form(prop) {
    const { setUserInput } = prop;

    function onChange(e) {
        setUserInput(e.target.value);
    }

    return (
        <div>
            <form>
                <label>Please enter product name: </label>
                <input type="text" onChange={onChange} />
            </form>
        </div>
    );
}

export default Form