const fs = require("fs").promises;
// Fetch data from CoinGecko API
const fetchDATA = async (url, name) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    const data = await response.json();
    const JData = JSON.stringify(data);
    await JSON_File_Creator(JData, name);
  } catch (error) {
    console.error(error);
  }
};

// Write JSON string to a file
const JSON_File_Creator = async (json_string, name) => {
  try {
    await fs.writeFile(`${name}.json`, json_string);
    console.log("Data written to file");
  } catch (err) {
    console.error("Error writing file", err);
  }
};
const main = async () => {
  try {
    console.log("Waiting");

    await fetchDATA(
      "https://app.equidam.com/api/v3/industries?lang=en",
      "industries"
    );
  } catch (error) {
    console.log("Problem happened", error);
  } finally {
    console.log("SUCCESSFUL");
  }
};

main();
