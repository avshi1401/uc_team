import { useState } from "react";

export function UserDeleteForm(props) {
    const [error, setError] = useState(null);
    const userIds = props.users.map(
        user => user.userId
    );

    function validateForm(formData) {
        const userId = formData.get("userId");

        if (!!!userId) {
            setError(`User ID is required`);

            return false;
        }

        if (!userIds.includes(userId)) {
            setError(`User ID: ${userId} doesn't exists`);

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
                    "method": "DELETE",
                    "headers": {
                        "Content-Type": "application/json",
                    },
                    "body": JSON.stringify(Object.fromEntries(formData)),
                }
            ).then(
                res => res.json(),
            ).then(
                res => {
                    props.onDeletedUser(res.user);
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
                </div>
                <button type="submit">Delete</button>
            </form>
        </div>
    )
}