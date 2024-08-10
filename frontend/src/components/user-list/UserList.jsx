import { useEffect, useState } from "react";
import './UserList.css'
import { fetchRequest } from '../../api'

export function UserList(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    function clickExpandCollapse() {
        setIsExpanded(!isExpanded);
    }

    useEffect(
        () => {
            const method = "GET";
            const body = null;
            const userId = null;

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
        <div>
            <div className="users-list-div">
                <ul className={isExpanded ? 'ul-expanded' : ''}>
                    {
                        props.users.map(
                            user => <li key={user.userId}><strong>{ user.userId }:</strong> { user.userName }, { user.userAge }</li>
                        )
                    }
                </ul>
            </div>
            <button className="expand-collapse-btn" onClick={clickExpandCollapse}>
                {isExpanded ? 'Collapse List' : 'Expand List'}
            </button>
        </div>
    )
}