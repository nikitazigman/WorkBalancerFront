
import useLocalStorage from "./useLocalStorage";

const useInput = (key, initValue) => {
    const [value, setValue] = useLocalStorage(key, initValue);
    const reset = () => setValue(initValue);
    const attributeObject = {
        value,
        onChange: (event) => { setValue(event.target.value) }
    };
    return [value, reset, attributeObject];
}

export default useInput;