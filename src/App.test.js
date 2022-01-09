import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';

test('searches for cat breed successfully', async () => {
  render(<App />);
  
  const searchInputElement = screen.getByTestId('search-input')

  fireEvent.change(searchInputElement, {target: {value: 'bengal'}})

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1100)
  })

  const loaderElement = screen.getByTestId('loader')

  expect(loaderElement).toBeInTheDocument()

  expect(searchInputElement.value).toEqual('bengal')
                                                                                                                      
  await waitForElementToBeRemoved(() => screen.queryByTestId('loader'))

  const result = screen.getByText('Bengal')
  expect(result).toBeInTheDocument()

});
