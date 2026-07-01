import { test, expect } from '@playwright/test';
import { readCsv } from '../utils/csvReader';

// Read user data from the CSV file. The CSV reader casts numeric fields
// appropriately and returns an array of objects. This demonstrates how
// externalised test data makes it easy to extend coverage without touching
// the test logic【848719906771145†L236-L244】.
const users = readCsv<{ login: string; expectedId: number }>('data/userData.csv');

users.forEach(({ login, expectedId }) => {
  test(`csv: user ${login} should have id ${expectedId}`, async ({ request }) => {
    const res = await request.get(`/users/${login}`);
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.id).toBe(expectedId);
  });
});
