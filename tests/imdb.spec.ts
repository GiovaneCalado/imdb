import { test, expect } from '@playwright/test';
import { validateContract } from '../utils/apiUtils';
import { faker } from '@faker-js/faker';

test.describe('Validate IMDB 100 best movies API', () => {
  test('Validate movie rate on IMDB DataBase according to non official API', async ({ request }) => {
    const response = await request.get('')
    const responseBody = await response.json()
  });
});