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

const sectorsJson = async (name) => {
  var result = {};
  try {
    // Read the JSON file
    const data = await fs.readFile(`${name}.json`, "utf8");

    // Parse the JSON file
    const obj = JSON.parse(data);
    const list = obj.data;
    //console.log(list);
    //Iterate over the JSON object
    for (const key in list) {
      const element = list[key];
      console.log(`${key} == ${element.name}`);
      result[key] = element.name;
    }
  } catch (err) {
    console.error("Error reading or parsing file", err);
  }
  jResult = JSON.stringify(result, null, 2);
  JSON_File_Creator(jResult, "sectors");
};

const main = async () => {
  try {
    console.log("Waiting");

    await fetchDATA(
      "https://app.equidam.com/api/v3/industries?lang=en",
      "industries"
    );
    await sectorsJson("industries");
  } catch (error) {
    console.log("Problem happened", error);
  } finally {
    console.log("SUCCESSFUL");
  }
};

main();
