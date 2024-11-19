import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationDispatch();
  const [error, setError] = useState(null);

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      addNotification(`Anecdote "${data.content}" created successfully`);
      setError(null); // Clear any previous error on success
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content, votes: 0 });
    } else {
      // Display an error notification for too short anecdote
      setError('Too short anecdote, must have length 5 or more');
      // Optionally, you can clear the error after a certain duration
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
