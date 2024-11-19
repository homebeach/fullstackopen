import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

test('renders content', () => {

  const blog = {
    title: 'Test',
    author: 'Test',
    url: 'www.google.com'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Test')
  expect(element).toBeDefined()
})

test('renders additional content', async () => {

  const user = userEvent.setup()

  const blogUser = {
    username: 'testuser',
    name: 'testuser'
  }

  const blog = {
    title: 'Test',
    author: 'Testauthor',
    url: 'www.google.com',
    user: blogUser
  }

  render(<Blog blog={blog}/>)

  const button = screen.getByText('view')
  await user.click(button)

  const element1 = screen.getByText('Test')
  expect(element1).toBeDefined()

  const authorRegex = /Testauthor/ // Use a regular expression to match the text
  const element2 = screen.getByText(authorRegex)
  expect(element2).toBeDefined()

  const urlRegex = /www.google.com/
  const element3 = screen.getByText(urlRegex)
  expect(element3).toBeDefined()

  const likesRegex = /like/
  const element4 = screen.getByText(likesRegex)
  expect(element4).toBeDefined()

  const userRegex = /testuser/
  const element5 = screen.getByText(userRegex)
  expect(element5).toBeDefined()

})