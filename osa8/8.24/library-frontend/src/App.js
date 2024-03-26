import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import Notify from './components/Notify'

import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [isLoggedIn, setIsLoggedIn] = useState(false) // State to track login status
  const { loading, error, data } = useQuery(ALL_BOOKS);

  // Once here, data should contain the fetched data
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.name} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)

    }
  })
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }


  const handleLogout = () => {
    // Perform logout actions here, such as removing the token from localStorage
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Update login status to false
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {isLoggedIn && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {isLoggedIn && <button onClick={() => setPage('add')}>add book</button>}
        {isLoggedIn ? (
          <button onClick={handleLogout}>logout</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
  
      <Notify errorMessage={errorMessage} />
  
      <Authors show={page === 'authors'} />
  
      <Books books={data.allBooks} show={page === 'books'} />
  
      {isLoggedIn && page === 'recommendations' && (
        <Recommendations show={page === 'recommendations'} />
      )}
      
      {isLoggedIn && page === 'add' && (
        <div>
          <Recommendations show={page === 'recommendations'} />
          <NewBook setError={notify} show={page === 'add'} />
        </div>
      )}
  
      <Login show={page === 'login'} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  )  
}

export default App
