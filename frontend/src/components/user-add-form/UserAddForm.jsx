import { useState } from "react";
import { fetchRequest } from "../../api";

export function UserAddForm(props) {
    const [errorMsg, setErrorMsg] = useState(null);
    const userIds = props.users.map(
        user => user.userId
    );

    function validateForm(formData) {
        const fields = {
            userId: {
                value: formData.get("userId"),
                name: "User ID"
            },
            userName: {
                value: formData.get("userName"),
                name: "User Name"
            },
            userAge: {
                value: formData.get("userAge"),
                name: "User Age"
            },
        };

        for (const field in fields) {
            const value = fields[field].value;
            const name = fields[field].name;

            if (!value) {
                setErrorMsg(`${name} is required`);

                return false;
            }
        }

        if (userIds.includes(fields.userId.value)) {
            setErrorMsg(`User ID: ${fields.userId.value} already exists`);
            
            return false;
        }

        setErrorMsg(null);

        return true;
    }

    function submit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        if (validateForm(formData)) {
            const method = "POST";

            fetchRequest(
                method,
                formData,
                null,
            ).then(
                (res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error(res.statusText);
                },
            ).then(
                res => {
                    props.onAddedUser(res.user);
                }
            ).catch(
                error => {
                    setErrorMsg(error.message);
                }
            );
        }
    }

    return ( 
        <div>
            {
                (errorMsg ? <span>{errorMsg}</span> : null)
            }
            <form onSubmit={submit}>
                <div className="form-div-input">
                    <label>User ID: </label>
                    <input name="userId" type="number"></input>
                    <label>User Name: </label>
                    <input name="userName" type="text"></input>
                    <label>User Age: </label>
                    <input name="userAge" type="number"></input>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}