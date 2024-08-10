import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { UserAddForm } from './components/user-add-form/UserAddForm'
import { UserList } from './components/user-list/UserList'
import { UserUpdateForm } from './components/user-update-form/UserUpdateForm'
import { UserDeleteForm } from './components/user-delete-form/UserDeleteForm'

function App() {
  const [users, setUsers] = useState([]);

  const onAddedUser = useCallback(
    (addedUser) => {
      setUsers(
        (prevUsers) => [...prevUsers, addedUser]
      )
    }
  )

  const onUpdatedUser = useCallback(
    (updatedUser) => {
      setUsers(
        (prevUsers) => prevUsers.map(
          user => user.userId === updatedUser.userId ? updatedUser : user
        )
      )
    }
  )

  const onDeletedUser = useCallback(
    (deletedUser) => {
      setUsers(
        (prevUsers) => prevUsers.filter(
          user => user.userId !== deletedUser.userId
        )
      )
    }
  )

  return (
    <>
      <h2>Users Page</h2>
      <div>You can see the users list below.</div>
      <UserList users={users} onFetchedUsers={setUsers}></UserList>
      <div>You can use each one of the forms to add/update/delete any user you would like.</div>
      <div class="div-components">
        <UserAddForm users={users} onAddedUser={onAddedUser}></UserAddForm>
        <UserUpdateForm users={users} onUpdatedUser={onUpdatedUser}></UserUpdateForm>
        <UserDeleteForm users={users} onDeletedUser={onDeletedUser}></UserDeleteForm>
      </div>
    </>
  )
}

export default App
