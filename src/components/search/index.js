import React, { useState, useRef } from "react";
import SearchResult from "./search-result";
import SearchController from "./search-controller";

const Search = () => {
    const [value, setValue] = useState("");
    const [active, setActive] = useState(false);
    const resultInputRef = useRef(null);

    const handleActive = (e) => {
<<<<<<< HEAD
      if (e.target.value === '') return;
=======
>>>>>>> develop
        setValue(e.target.value);
        setActive(true);
        document.body.classList.add("is-fixed")
    };

    return (
      <div className={active? `c-search is-active`: `c-search`}>
            <input
                type="text"
                onKeyUp={handleActive}
<<<<<<< HEAD
                // onFocus={handleActive}
=======
>>>>>>> develop
                placeholder="どんな記事を読みたいですか?"
                className="c-search__input"
            />
            {active && (
                <SearchResult setActive={setActive} value={value} setValue={setValue}>
                    <SearchController
                        value={value}
                        setValue={setValue}
                        setActive={setActive}
                        active={active}
                        resultInputRef={resultInputRef}
                    />
                </SearchResult>
            )}
        </div>
    );
};

export default Search;
