import { useState } from "react";

export function UserUpdateForm(props) {
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

            if (!!!value) {
                setError(`${name} is required`);

                return false;
            }
        }

        if (!userIds.includes(fields.userId.value)) {
            setError(`User ID: ${fields.userId.value} doesn't exists`);

            return false
        }

        return true
    }

    function submit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const userId = formData.get("userId");

        if (validateForm(formData)) {
            fetch(
                `http://127.0.0.1:5000/users/${userId}`,
                {
                    "method": "PUT",
                    "headers": {
                        "Content-Type": "application/json",
                    },
                    "body": JSON.stringify(Object.fromEntries(formData)),
                }
            ).then(
                res => res.json(),
            ).then(
                res => {
                    props.onUpdatedUser(res.user);
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
                <div class="form-div-input">
                    <label>User ID: </label>
                    <input name="userId" type="number"></input>
                    <label>User Name: </label>
                    <input name="userName" type="text"></input>
                    <label>User Age: </label>
                    <input name="userAge" type="number"></input>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}