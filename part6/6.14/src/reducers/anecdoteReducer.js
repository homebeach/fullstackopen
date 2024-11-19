import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [] ,
  reducers: {
    createAnecdote: (state, action) => {
      state.push(asObject(action.payload));
    },
    voteAnecdote: (state, action) => {
      const id = action.payload;

      console.log("id")
      console.log(id)

      console.log("this is")
      console.log(state)
      const anecdoteToChange = state.find(n => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };

      const index = state.findIndex(anecdote => anecdote.id === id);
      if (index !== -1) {
        state[index] = changedAnecdote;
      }
    },
    appendAnecdote(state, action) {
      state.push(asObject(action.payload))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
});

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;