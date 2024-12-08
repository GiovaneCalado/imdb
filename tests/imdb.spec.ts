import { test, expect } from '@playwright/test';
import { validateContract } from '../utils/apiUtils';
import { faker } from '@faker-js/faker';
import { Client } from 'pg';

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'imdb'
});

test.describe('Validate IMDB 100 best movies API', () => {
  test('Validate movie rate on IMDB DataBase according to non official API', async ({ request }) => {
    const response = await request.get('')
    const responseBody = await response.json()
    await client.connect()
    const result = await client.query(`select * from imdb_top_1000 where series_title = 'The Shawshank Redemption'`)
    console.log(result.rows)
  });
});