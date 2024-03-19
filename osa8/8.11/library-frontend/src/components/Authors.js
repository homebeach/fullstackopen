import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const Authors = (props) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const submit = async (event) => {
    event.preventDefault();

    try {
      const response = await editAuthor({ variables: { name, setBornTo: parseInt(born) } });
      console.log('Edit author response:', response);
      setName('');
      setBorn('');
    } catch (error) {
      console.error('Edit author error:', error);
    }
  };

  if (!props.show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const authors = data?.allAuthors || [];

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((author) => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <form onSubmit={submit}>
          <div>
            Name
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            Born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">Edit author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;