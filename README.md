# Playwright Data‑Driven Testing

Data‑driven testing (DDT) allows you to run the same test logic against multiple sets of input values.  This repository shows how to implement DDT in Playwright and TypeScript using arrays, JSON files and CSV files.  The example tests query the [GitHub Users API](https://api.github.com/users) with various usernames and assert that each user’s `login` and `id` fields match expected values.  Separating test data from test logic makes your suites easier to maintain and expand.

## Why data‑driven tests?

An article on Playwright DDT notes that parameterizing tests helps avoid duplication and encourages descriptive test names【848719906771145†L174-L233】.  Instead of writing separate test functions for each user, you supply an array of data and iterate through it.  The article also shows that external data sources like JSON or CSV files can feed tests without hard‑coding values, and that Playwright’s `test.describe()` and `test()` APIs seamlessly handle the iteration【848719906771145†L174-L233】.

## Included examples

This repository includes three variations of the same test:

1. **Inline array** (`tests/inline-array.spec.ts`) – defines an array of objects inline within the test file.  Each object contains a `username` and an expected `id`.  The test loops over this array using `test.describe()` to generate parameterized tests.
2. **JSON file** (`tests/json-data.spec.ts`) – reads data from `data/userData.json`.  The JSON file holds an array of objects with `username` and `expectedId` fields.  Tests map through the data and call the GitHub API for each entry.
3. **CSV file** (`tests/csv-data.spec.ts`) – parses the `data/userData.csv` file using a simple CSV reader (`utils/csvReader.ts`).  Each row provides a username and an expected ID.  The test converts each row into a usable object and then iterates over the entries.

All tests use Playwright’s `request` fixture to fetch user data from `https://api.github.com/users/<username>` and assert that the returned `id` matches the expected value.  See the sample JSON response for the `octocat` user【484780404485020†L20-L36】.

## How to run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run all data‑driven tests:

   ```bash
   npx playwright test
   ```

3. To run a single spec:

   ```bash
   npx playwright test tests/inline-array.spec.ts
   ```

4. Optionally view the HTML report:

   ```bash
   npx playwright show-report
   ```

Feel free to extend the datasets with additional GitHub usernames or adapt the API endpoint to suit your own application.  The pattern illustrated here can scale to larger data sources or integrate with external data providers (e.g., spreadsheets or databases).

## Project structure

- `data/userData.json` – list of username/id pairs used in the JSON data test.
- `data/userData.csv` – comma‑separated file with username and id columns.
- `utils/csvReader.ts` – minimal CSV parsing utility.
- `playwright.config.ts` – base configuration, including GitHub API base URL.
- `tests/inline-array.spec.ts` – inline array example.
- `tests/json-data.spec.ts` – JSON data example.
- `tests/csv-data.spec.ts` – CSV data example.

By externalizing test data and using descriptive test titles, you can build scalable Playwright test suites without duplicating code【848719906771145†L174-L233】.
