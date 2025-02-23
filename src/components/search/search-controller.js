import React, { useEffect } from "react";

const SearchController = ({ setActive, setValue, value, resultInputRef, active }) => {
  const handleClose = () => {
    setValue('');
    setActive(false);
    document.body.classList.remove("is-fixed");
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleFocus = () => {
    console.log("Input field is focused");
  };

  // activeがtrueの場合にフォーカスを設定
  useEffect(() => {
    if (active && resultInputRef.current) {
      resultInputRef.current.focus();
    }
  }, [active, resultInputRef]);

  return (
    <p className="c-search__result__wrapper">
      <input
        type="text"
        onChange={handleChange}
        value={value}
        ref={resultInputRef}
        className="c-search__input"
        placeholder="どんな記事を読みたいですか?"
        onFocus={handleFocus}
      />
      <button type="button" aria-label="Close" onClick={handleClose} className="c-search__close-btn"></button>
    </p>
  );
};

export default SearchController;
