const request = require('supertest');
const express = require('express');
const app = express();
const { getStories } = require('../getStories.js'); // Replace 'your-module' with the actual path to your module

// Mock the OpenAI API response for testing
jest.mock('openai', () => ({
  Configuration: jest.fn(),
  OpenAIApi: jest.fn(() => ({
    createCompletion: jest.fn((params) => ({
      data: {
        choices: [{ text: 'Mocked response from OpenAI API' }],
      },
    })),
  })),
}));

app.use(express.json());
app.post('/your-route', getStories);

describe('GET /your-route', () => {
  it('responds with 200 status and a valid response', async () => {
    const response = await request(app)
      .post('/your-route')
      .send({
        synopsis: 'Your synopsis',
        previousPart: 1,
        nextPart: 2,
        randomEvent: 'A random event',
        userInput: true,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('response');
    expect(response.body).toHaveProperty('imagePrompt');
    expect(response.body).toHaveProperty('message', 'This is the first part of the story');
  });

  it('responds with 400 status for invalid request', async () => {
    const response = await request(app).post('/your-route').send({
      // Invalid request payload
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'An error happened!');
  });

  it('responds with 500 status for internal server error', async () => {
    // Mock an error in the OpenAI API response
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(require('openai').OpenAIApi.prototype, 'createCompletion').mockRejectedValueOnce(new Error('Mocked OpenAI API error'));

    const response = await request(app)
      .post('/your-route')
      .send({
        synopsis: 'Your synopsis',
        previousPart: 1,
        nextPart: 2,
        randomEvent: 'A random event',
        userInput: true,
      });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Internal Server Error');

    // Restore the original console.error function
    console.error.mockRestore();
  });
});
