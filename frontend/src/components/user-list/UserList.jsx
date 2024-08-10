import { useEffect } from "react";
import './UserList.css'

export function UserList(props) {
    useEffect(
        () => {
            fetch(
                "http://127.0.0.1:5000/users",
                {
                    "method": "GET",
                },
            ).then(
                res => res.json(),
            ).then(
                res => {
                    props.onFetchedUsers(res.users);
                }
            )
            .catch(
                error => {
                    console.error(error);
                }
            )
        },
        [],
    )

    return (
        <div className="users-list-div">
            <ul>
                {
                    props.users.map(
                        user => <li key={user.userId}><strong>{ user.userId }:</strong> { user.userName }, { user.userAge }</li>
                    )
                }
            </ul>
        </div>
    )
}