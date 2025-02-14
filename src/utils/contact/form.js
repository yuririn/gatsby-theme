import React, { useState } from "react";
import { validateName, validateEmail, validateMessage, validateAgreement } from "./validations";
import LoadingSpinner from './../../components/icon-and-logo/Loading-sppner';
import { types } from "./constants";
const Form = ({ onFormSubmit }) => {
    const [type, setType] = useState("");
    const [value, setValue] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setMailError] = useState("");
    const [agreement, setAgreement] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [nameError, setNameError] = useState("");
    const [messageError, setMessageError] = useState("");
    const [agreementError, setAgreementError] = useState("");
    const [loading, setLoading] = useState(false);

    const [isNameTouched, setIsNameTouched] = useState(false);
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [isMessageTouched, setIsMessageTouched] = useState(false);
    const [isAgreementTouched, setIsAgreementTouched] = useState(false);

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        setType(selectedType);
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        if (isNameTouched) {
            setNameError(validateName(value));
        }
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        if (isEmailTouched) {
            setMailError(validateEmail(emailValue));
        }
    };

    const handleMessageChange = (e) => {
        const value = e.target.value;
        setValue(value);
        if (isMessageTouched) {
            setMessageError(validateMessage(value));
        }
    };

    const handleNameBlur = () => {
        setIsNameTouched(true);
        setNameError(validateName(name));
    };

    const handleEmailBlur = () => {
        setIsEmailTouched(true);
        setMailError(validateEmail(email));
    };

    const handleMessageBlur = () => {
        setIsMessageTouched(true);
        setMessageError(validateMessage(value));
    };

    const handleAgreementChange = (e) => {
        const isChecked = e.target.checked;
        setAgreement(isChecked);
        if (isAgreementTouched) {
            setAgreementError(validateAgreement(isChecked));
        }
    };

    const handleAgreementBlur = () => {
        setIsAgreementTouched(true);
        setAgreementError(validateAgreement(agreement));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!validateName(name) && !validateEmail(email) && !validateMessage(value) && !validateAgreement(agreement)) {
            const data = {
                type,
                name,
                email,
                message: value,
                agreement
            };

            try {
                const response = await fetch("https://script.google.com/macros/s/AKfycbxBYemwfsZuP4EZYzvj6j8nfW9kKF5JoeKP747VWpgjGiiyEJ7xLtGCAYDl9D81qD6Mng/exec", {
                    method: "POST",
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    // GTMのデータレイヤーにイベントを送信
                    if (window.dataLayer) {
                        window.dataLayer.push({
                            event: 'applied',
                        });
                    }
                    // フォームのリセット
                    setType("");
                    setName("");
                    setEmail("");
                    setValue("");
                    setAgreement(false);
                    setErrorMessage("");
                    onFormSubmit(); // 親コンポーネントのコールバックを呼び出す
                } else {
                    const result = await response.json();
                    setErrorMessage(result.error);
                }
            } catch (error) {
                setErrorMessage("送信中にエラーが発生しました。");
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const isFormValid = !validateName(name) && !validateEmail(email) && !validateMessage(value) && !validateAgreement(agreement);

    return (
        <div className="c-form">
            <form
                name="contact"
                method="POST"
                onSubmit={handleSubmit}
            >
                <input type="hidden" name="form-name" value="contact" />
                <dl>
                    <dt>ご相談の種類</dt>
                    <dd className="c-form__list">
                        <ul>
                            {types.map((value, i) => (
                                <li key={`item${i}`}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="type"
                                            value={value.name}
                                            onChange={handleTypeChange}
                                        />
                                        <span>{value.name}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <Detail name={type} />
                    </dd>
                    <dt>
                        お名前<span>必須</span>
                    </dt>
                    <dd>
                        <input
                            type="text"
                            name="name"
                            required
                            onChange={handleNameChange}
                            onBlur={handleNameBlur}
                        />
                        <p className="error">{nameError}</p>
                    </dd>
                    <dt>
                        メールアドレス<span>必須</span>
                    </dt>
                    <dd>
                        <input
                            type="email"
                            name="email"
                            required
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                        />
                        <p className="error">{emailError}</p>
                    </dd>
                    <dt>メッセージ<span>必須</span></dt>
                    <dd>
                        <textarea
                            type="text"
                            name="message"
                            onChange={handleMessageChange}
                            onBlur={handleMessageBlur}
                        />
                        <p className="error">{messageError}</p>
                    </dd>
                </dl>
                <p className="agreement">
                    <label>
                        <input
                            type="checkbox"
                            name="agreement"
                            required
                            onChange={handleAgreementChange}
                            onBlur={handleAgreementBlur}
                        />
                        <span className="error">{agreementError}</span>
                    </label>
                    <a href="/privacy-policy/" target="_blank">
                        プライバシーポリシー
                    </a>
                    に同意の上送信する
                </p>
                <p className="error">{errorMessage}</p>
                <p>
                    <button
                        type="submit"
                        disabled={!isFormValid || loading}
                    >
                        送信する
                    </button>
                </p>
                <p className={`loading u-center ${loading ? "show" : ""}`}>
                    <LoadingSpinner></LoadingSpinner>
                </p>
            </form>
        </div>
    );
};

const Detail = ({ name }) => {
    let description = "";
    types.map((value) => {
        if (name === value.name) description = value.description;
        return description;
    });

    return <p>{description}</p>;
};

export default Form;
