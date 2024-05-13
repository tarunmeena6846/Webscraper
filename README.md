# YC Company Web Scraping

## Instructions

### Setup

#### Clone the repository:

```bash
git clone https://github.com/tarunmeena6846/Webscraper.git
```

#### Install Dependencies

```
npm install
```

# Running the Scraper

To execute the scraping script, run the following command:

```bash
npx tsc && npm start
```

# Output

The structured data for each YC company is stored in the `out/scraped.json` file.

# File Structure

- `inputs/companies.csv`: CSV file containing the list of YC companies.
- `src/challenge.ts`: TypeScript code for the scraping tool.
- `out/scraped.json`: Output JSON file containing structured data about YC companies.
- `node_modules/`: Dependencies directory.
- `package.json`, `package-lock.json`: NPM package configuration files.

# Dependencies

- `crawlee`: Library for web scraping.
- `cheerio`: HTML parsing library.
- `fast-csv` or `papaparse`: CSV parsing library.
- `fs/promises`, `fs-extra`: File system utilities.

# Evaluation

The scraper outputs a properly structured JSON file at `out/scraped.json`. It handles various YC company pages and extracts relevant information accurately.