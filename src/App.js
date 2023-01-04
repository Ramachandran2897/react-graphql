import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [nationality, setNationality] = useState('')
  const getAllUsers = gql`
  query getAllUsers{
      users {
        id
        name
  }
}
  `
  const getUser = gql`
      query getUser($userId: ID!){
        user(id: $userId) {
          name
        }
      }
  `
  const createUsergql = gql`
    mutation createuserData($data: createUserInput!){
      createUser(data: $data) {
        id
        name
        age
      }
    }
  `
  const deleteUsergql = gql`
    mutation deleteUserData($deleteUserId: ID!){
      deleteUser(id: $deleteUserId) {
        name
        id
        nationality
  }
}
  `
  const { data, loading, refetch } = useQuery(getAllUsers)
  const [getData, { data: userDetailsData }] = useLazyQuery(getUser)
  const [createUser] = useMutation(createUsergql)
  const [deleteUser] = useMutation(deleteUsergql)

  // console.log(data, loading, error)
  console.log(userDetailsData)
  if (loading) {
    return <h1>loading</h1>
  } else
    return (
      <div className="App">
        learn react
        <div>
          <input type={"text"} placeholder="name" onChange={(event) => setName(event.target.value)} />
          <input type={"number"} placeholder="age" onChange={(event) => setAge(event.target.value)} />
          <input type={"text"} placeholder="Nationality" onChange={(event) => setNationality(event.target.value.toUpperCase())} value={nationality} />
          <button onClick={() => createUser({
            variables: {
              data: {
                name,
                age: Number(age),
                nationality
              }
            }
          })}>create user</button>
        </div>
        {userDetailsData ?
          <>
            <h1>user Data</h1>
            <p>{userDetailsData.user.name}</p>
          </> :
          <>
            <h1>List of users</h1>
            {data && data.users.map((obj) => <><p key={obj.id} onClick={() => getData({ variables: { userId: obj.id } })}>{obj.name}</p> <button>Edit</button> <button onClick={()=>deleteUser({variables:{
              deleteUserId: obj.id
            }})}>delete</button></>)}
          </>
        }
        <br />
        <button onClick={() => refetch()}>refetch</button>
      </div>
    );
}

export default App;
