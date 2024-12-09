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
    for (const movie of responseBody){
      const movieData = await client.query(`SELECT * FROM imdb_top_1000 WHERE series_title = $1`, [movie.title])
      if (movieData.rows.length === 0) {
        continue;
      }
      console.log(movie.title)
      expect(movieData.rows.length).toBe(1)
      expect(movieData.rows[0].series_title).toBe(movie.title)
      expect(movieData.rows[0].released_year).toBe(movie.year)
      expect(movieData.rows[0].genre.replace(/\s/g, "")).toBe(movie.genre.toString().replace(/\s/g, ""))
      expect(movie.rating).toContain(movieData.rows[0].imdb_rating)
    }
    await client.end()
  });
});