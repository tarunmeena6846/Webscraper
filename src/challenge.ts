/**
 * The entry point function. This will read the provided CSV file, scrape the companies'
 * YC pages, and output structured data in a JSON file.
 */
import * as fs from "fs";
import { scrapeYCProfile } from "./scrapeYCProfile";
import { CSV_INPUT_PATH } from "./resources";
import { Dataset } from "crawlee";
export async function processCompanyList() {
  // Read the CSV file containing the company names and URLs
  const csvData = fs.readFileSync(CSV_INPUT_PATH, "utf-8").split("\n");
  console.log("csvData", csvData);

  // Remove header row
  csvData.shift();
  // Array to store scraped data

  // Loop through each line of the CSV data
  for (const line of csvData) {
    const columns = line.split(",");
    console.log(columns);
    if (columns.length >= 2) {
      const url = columns[columns.length - 1].trim();
      // Scrape YC profile page for each company
      console.log(url);
      await scrapeYCProfile(url);
    }
    // Push scraped data to array
  }
  const scrapedData = await Dataset.getData();

  // Write scraped data to JSON file
  fs.writeFileSync("out/scraped.json", JSON.stringify(scrapedData, null, 2));
}
