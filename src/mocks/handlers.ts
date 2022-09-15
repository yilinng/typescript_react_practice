// src/mocks/handlers.js
import { rest } from 'msw'
export const handlers = [
  rest.post('/posts', (req, res, ctx) => {
    // Persist user's authentication in the session
    //sessionStorage.setItem('is-authenticated', 'true')
    return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),
  rest.get('/posts', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    /*
    const isAuthenticated = sessionStorage.getItem('is-authenticated')
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      )
    }
    */
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
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
          }]),
    )
  }),
]