import { useEffect, useState } from "react";

import moment from "moment/moment";


const LEVEL_REGEX = /^[1-9]{1}$/

const useTaskValidation = (task) => {
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        const date = moment(task.deadline, "YYYY-MM-DD", true);

        const is_date_valid = date.isValid();
        const is_level_valid = LEVEL_REGEX.test(String(task.level));

        if (!is_date_valid) {
            setErrMsg("The date should have the following format YYYY-MM-DD");
            return
        }

        if (!is_level_valid) {
            setErrMsg("The level should be between 1 and 9");
            return
        }

        setErrMsg("");

    }, [task.level, task.deadline]);

    return errMsg;
}

export default useTaskValidation;