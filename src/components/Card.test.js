import { render, screen } from '@testing-library/react';
import Card from './Card';

test('renders card correctly', () => {

  const name = 'cat'
  const weight = '5 - 7'
  const life_span = '7 - 10'

  render(<Card data={{ name, weight: { metric: weight }, life_span  }}/>);
  const nameElement = screen.getByText(name);
  const weightElement = screen.getByText(`Weight: ${weight}`);
  const lifespanElement = screen.getByText(`Life span: ${life_span}`);
  expect(nameElement).toBeInTheDocument();
  expect(weightElement).toBeInTheDocument();
  expect(lifespanElement).toBeInTheDocument();
});
