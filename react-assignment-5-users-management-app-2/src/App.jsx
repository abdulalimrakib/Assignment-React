/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import Search from './components/Search';
import Users from './components/Users';
import UseFetch from './hook/UseFetch';

const App = () => {
  // Task 2: use custom hook
  // get data, error, isLoading states from custom hook here

  const { isLoading, error, data } = UseFetch('https://jsonplaceholder.typicode.com/users')

  const [usingData, setUsingData] = useState(null)
  const [copyData, setCopyData] = useState(usingData)

  useEffect(() => {
    if (data) {
      setUsingData(data)
      setCopyData(data)
    }
  }, [data])
  console.log(usingData);
  console.log(copyData);
  // use url: 'https://jsonplaceholder.typicode.com/users'

  // Task 3: delete user
  // get the id from User.js
  const handleDeleteUser = (id) => {
    const filterData = data.filter((wantToDeleteData) => wantToDeleteData.id !== id)
    setCopyData(filterData)
  };




  // Task 4: search user
  // get the text from Search.js
  const handleSearch = (searchText) => {
    const value = searchText.toLowerCase();
    const newValue = usingData && usingData.filter(user => {
      const newUser = user.name.toLowerCase();
      return newUser.startsWith(value);
    })
    setCopyData(newValue)
  };

  return (
    <div className="container">
      <div className='flex justify-center text-center'>
        <div>
          <h1 className="text-[40px] font-bold">Users Management App</h1>
          {isLoading && <p>Loading users...</p>}
          {error && <p>{error}</p>}

          {/* Needs to pass functions from here for state lifting  */}
          <Search onHandleSearch={handleSearch} />
        </div>
      </div>

      {copyData && copyData.length > 0 && <Users users={copyData} onHandleDeleteUser={handleDeleteUser} />}
    </div>
  );
};

export default App;