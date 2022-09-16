import { render, screen } from '@testing-library/react';
import App from './App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  // Describe network behavior with request handlers.
  // Tip: move the handlers into their own module and
  // import it across your browser and Node.js setups!
  rest.get('/posts', (req, res, ctx) => {
    return res(
      ctx.json([
            {
              "title": "Brand New Breeze",
              "content": "Brand New Breeze",
              "id": 1
            },
            {
              "title": "Pachelbel: Kanon",
              "content": "Pachelbel: Kanon",
              "id": 4
            },
            {
              "title": "Debussy: La fille aux cheveux de lin",
              "content": "Debussy: La fille aux cheveux de lin",
              "id": 5
            }
          ]),
    )
  }),
)

// Enable request interception.
beforeAll(() => server.listen())

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
afterEach(() => server.resetHandlers())

// Don't forget to clean up afterwards.
afterAll(() => server.close())

test('renders First Post and Second Post', () => {
  render(<App />);
  const firstElement = screen.getByText(/First Post/i);
  expect(firstElement).toBeInTheDocument();
  const secondElement = screen.getByText(/Second Post/i);
  expect(secondElement).toBeInTheDocument();
});

test('Displays 3 posts initially', async () => {
  render(<App />)
  // Wait for page to update with query text
  const items = await screen.findAllByTestId('clearPost')
  expect(items).toHaveLength(3)
});

