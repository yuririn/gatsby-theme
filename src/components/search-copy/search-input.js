import React from "react";

const SearchInput = ({ focus, setFocus, value, setValue, resultInputRef, getClass, onBlur }) => {
    const onFocus = () => setFocus(true);
    const handleBlur = (e) => {
        setFocus(false);
        if (onBlur) onBlur(e);
    };
    const onChange = (e) => setValue(e.target.value);

    return (
        <input
            type="text"
            onFocus={onFocus}
            onBlur={handleBlur}
            onChange={onChange}
            value={value}
            ref={resultInputRef}
            className={getClass}
            placeholder="どんな記事を読みたいですか?"
        />
    );
};

export default SearchInput;
