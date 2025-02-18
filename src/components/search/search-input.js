import React from "react";

const SearchInput = ({ value, setValue, setMode, getClass, resultInputRef }) => {
    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        setMode(newValue.trim() !== '' ? 'active' : 'inactive');
    };

    return (
        <input
            type="text"
            onChange={handleChange}
            value={value}
            ref={resultInputRef}
            className={getClass}
            placeholder="どんな記事を読みたいですか?"
        />
       
    );
};

export default SearchInput;
