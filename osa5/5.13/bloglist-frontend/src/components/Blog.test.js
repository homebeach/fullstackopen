import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Test',
    author: 'Test',
    url: 'www.google.com'
  }

  render(<Blog note={blog} />)

  const element = screen.getByText('Test')
  expect(element).toBeDefined()
})