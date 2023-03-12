
import { useState } from "react";

const useInput = (initValue) => {
    const [value, setValue] = useState(initValue);
    const reset = () => setValue(initValue);
    const attributeObject = {
        value,
        onChange: (event) => { setValue(event.target.value) }
    };
    return [value, reset, attributeObject];
}

export default useInput;