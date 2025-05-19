
export default function RegistrationFrom() {
    return (
        <>
            <h1>Jerp Registration</h1>
            <form action={"https://localhost:8080/users"} method={"POST"}>
                <div className={"form-floating mt-3 mb-3"}>
                    <input type={"email"} className={"form-control"} id={"email"} placeholder={"Enter email"} name={"email"}/>
                    <label htmlFor={"email"}>Email</label>
                </div>
                <button type={"submit"} className={"btn-primary"}>Submit</button>
            </form>
        </>
    )
}
