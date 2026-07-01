import { test, expect } from '@playwright/test';
import userData from '../data/userData.json';

// Cast imported JSON to an array of user objects
const users: any[] = userData as any[];

for (const { login, expectedId } of users as any[]) {
  test(`json: user ${login} should have id ${expectedId}`, async ({ request }) => {
    const res = await request.get(`/users/${login}`);
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.id).toBe(expectedId);
  });
}
