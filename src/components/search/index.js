import React, { useState, useRef } from "react";
import SearchResult from "./SearchResult";
import SearchInput from './SearchInput';

const Search = (props) => {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState("");
    const resultInputRef = useRef(null);

    // SearchResultを閉じるハンドラ
    const handleClose = () => {
        setFocus(false);
        setValue("");
    };

    return (
        <div focus={focus.toString()} className="c-search">
            <SearchInput
                focus={focus}
                setFocus={setFocus}
                value={value}
                setValue={setValue}
                resultInputRef={resultInputRef}
                getClass="c-search__input"
            />
            {focus && value !== "" && (
                <SearchResult
                    focus={focus}
                    value={value}
                    setFocus={setFocus}
                    setValue={setValue}
                    pageType={props.type}
                    resultInputRef={resultInputRef}
                    onClose={handleClose} // 閉じるハンドラを渡す
                />
            )}
        </div>
    );
};

export default Search;
