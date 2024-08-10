import { useState } from "react";

export function UserAddForm(props) {
    const [error, setError] = useState(null);
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
        }

        for (const field in fields) {
            const value = fields[field].value;
            const name = fields[field].name;

            if (!value) {
                setError(`${name} is required`);

                return false;
            }
        }

        if (userIds.includes(fields.userId.value)) {
            setError(`User ID: ${fields.userId.value} already exists`);
            
            return false
        }

        setError(null);

        return true
    }

    function submit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        if (validateForm(formData)) {
            fetch(
                "http://127.0.0.1:5000/users",
                {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json",
                    },
                    "body": JSON.stringify(Object.fromEntries(formData)),
                }
            ).then(
                res => res.json(),
            ).then(
                res => {
                    props.onAddedUser(res.user);
                }
            ).catch(
                e => {
                    console.error(e);
                }
            )
        }
    }

    return ( 
        <div>
            {
                (error ? <span>{error}</span> : null)
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
    )
}