import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SmartFlow Pro header', () => {
  render(<App />);
  const headerElement = screen.getByText(/SmartFlow Pro/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders main dashboard', () => {
  render(<App />);
  const dashboardElement = screen.getByText(/Real-Time Order Flow/i);
  expect(dashboardElement).toBeInTheDocument();
});

test('renders stats bar', () => {
  render(<App />);
  const totalVolumeElement = screen.getByText(/Total Volume/i);
  expect(totalVolumeElement).toBeInTheDocument();
});