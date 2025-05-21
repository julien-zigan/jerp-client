import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";
import axios from '../api/axios';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/register';

const RegistrationForm = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);


    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);


    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccesss] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!EMAIL_REGEX.test(email) || !PWD_REGEX.test(pwd)) {
            setErrMsg("Invalid entry!");
            return;
        }
        try {
            const response =
                await axios.post(
                    REGISTER_URL,
                    JSON.stringify({ email, pwd } ),
                    {
                        headers: {'Content-Type': 'application/json'}
                    });
            console.log(response.data);
            console.log(JSON.stringify(response));
            setSuccesss(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 409) {
                setErrMsg('Account with that email already exists.');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <section className={"text-center"}>
            <div className={"card p-5"}>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live={"assertive"}>{errMsg}</p>
                <h1>Jerp Registration</h1>
                <form onSubmit={handleSubmit}>
                    <div className={"form-floating mt-3 mb-3 input-group-has-validation"}>
                        <input
                            className={"form-control"}
                            type={"email"}
                            id={"email"} placeholder={"Enter email"}
                            ref={userRef}
                            autoComplete={"off"}
                            name={"email"}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            aria-describedby={"emailnote"}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            required
                        />
                        <label htmlFor={"email"}>
                            Email
                            <span className={validEmail ? "valid" : "d-none"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validEmail || !email ? "d-none" : "invalid"} >
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <p id={"emailnote"} className={emailFocus && !validEmail? "instructions" : "d-none"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must be valid email address.
                        </p>

                    </div>
                    <div className={"form-floating mt-3 mb-3"}>
                        <input
                            type={"password"}
                            className={"form-control"}
                            id={"pwd"} placeholder={"Enter password"}
                            name={"pwd"}
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby={"pwdnote"}
                            onFocus={() => setPwdFocus(true)}
                            onBlur = {() => setPwdFocus(false)}
                            required
                        />
                        <label htmlFor={"pwd"}>
                            Password
                            <span className={validPwd ? "valid" : "d-none"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? "d-none" : "invalid"} >
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <p id={"pwdnote"} className={pwdFocus && !validPwd? "instructions" : "d-none"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters,
                            a number and a special character [!@#$%].<br />
                        </p>
                    </div>
                    <div className={"form-floating mt-3 mb-3"}>
                        <input
                            type={"password"}
                            className={"form-control"}
                            id={"pwd-confirmation"} placeholder={"Confirm password"}
                            name={"pwd-confirmation"}
                            onChange={(e) => setMatchPwd(e.target.value)}
                            //value={pwd}
                            aria-describedby={"confirmnote"}
                            aria-invalid={validMatch ? "false" : "true"}
                            onFocus={() => setMatchFocus(true)}
                            onBlur = {() => setMatchFocus(false)}
                            required
                        />
                        <label htmlFor={"pwd-confirmation"}>
                            Confirm Password
                            <span className={ validMatch && matchPwd ? "valid" : "d-none"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validMatch || !matchPwd ? "d-none" : "invalid"} >
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <p id={"confirmnote"} className={matchFocus && !validMatch? "instructions" : "d-none"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                    </div>
                    <button disabled={!validEmail || !validPwd || !validMatch } className={"btn-primary"}>Register</button>
                </form>
            </div>

        </section>
    )
}

export default RegistrationForm
