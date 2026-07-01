import { test, expect } from '@playwright/test';

// Inline data set for data‑driven API tests. Each entry specifies a GitHub
// username and the expected numeric ID returned by the API. Data‑driven
// testing allows you to reuse the same test logic across multiple
// scenarios【848719906771145†L236-L244】.
const userData = [
  { login: 'octocat', expectedId: 583231 },
  { login: 'mojombo', expectedId: 1 },
];

for (const { login, expectedId } of userData) {
  test(`inline: user ${login} should have id ${expectedId}`, async ({ request }) => {
    const res = await request.get(`/users/${login}`);
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.id).toBe(expectedId);
  });
}
