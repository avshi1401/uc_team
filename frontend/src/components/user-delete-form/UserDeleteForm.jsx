import { useState } from "react";
import { fetchRequest } from '../../api'

export function UserDeleteForm(props) {
    const [errorMsg, setErrorMsg] = useState(null);
    const userIds = props.users.map(
        user => user.userId
    );

    function validateForm(formData) {
        const userId = formData.get("userId");

        if (!userId) {
            setErrorMsg(`User ID is required`);

            return false;
        }

        if (!userIds.includes(userId)) {
            setErrorMsg(`User ID: ${userId} doesn't exists`);

            return false
        }

        setErrorMsg(null);

        return true
    }

    function submit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const userId = formData.get("userId");

        if (validateForm(formData)) {
            const method = "DELETE";
            const body = null;

            fetchRequest(
                method,
                body,
                userId,
            ).then(
                (res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error(res.statusText);
                },
            ).then(
                res => {
                    props.onDeletedUser(res.user);
                }
            ).catch(
                error => {
                    setErrorMsg(error.message);
                }
            )
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
                </div>
                <button type="submit">Delete</button>
            </form>
        </div>
    )
}