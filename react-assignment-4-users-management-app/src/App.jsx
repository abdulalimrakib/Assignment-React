/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import Users from './components/Users';

const App = () => {
  // step1 : declare three states here : users, isLoading, error
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [users, steUsers] = useState([])

  // step2 : use useEffect for fetching the data including updating isLoading and error states
  useEffect(() => {
    setIsLoading(true);
    try {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => {
          steUsers(data)
          setIsLoading(false)
        })
    } catch (e) {
      setIsLoading(false)
      setError(e)
    }
  }, [])

  return (
    <div className="container">
      <div className='flex justify-center'>
        <h1 className="text-[40px] font-bold mb-5">Users Management App</h1>
      </div>
      {isLoading && <p>Loading users...</p>}
      {error && <p>{error}</p>}
      {/* step3 : pass the users data to Users component  */}
      <Users users={users}></Users>
    </div>
  );
};

export default App;