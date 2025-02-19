import React, { useState, useRef } from "react";
import SearchResult from "./search-result";
import SearchController from "./search-controller";

const Search = () => {
    const [value, setValue] = useState("");
    const [active, setActive] = useState(false);
    const initialInputRef = useRef(null);
    const resultInputRef = useRef(null);

    const handleActive = (e) => {
        setValue(e.target.value);
        setActive(e.target.value ? true : false);
    };

    return (
        <div className="c-search">
            <input
                type="text"
                onChange={handleActive}
                ref={initialInputRef}
                placeholder="どんな記事を読みたいですか?"
                className="c-search__input"
            />
            {active && (
                <SearchResult setActive={setActive} value={value} setValue={setValue}>
                    <SearchController
                        value={value}
                        setValue={setValue}
                        setActive={setActive}
                        resultInputRef={resultInputRef}
                    />
                </SearchResult>
            )}
        </div>
    );
};

export default Search;
