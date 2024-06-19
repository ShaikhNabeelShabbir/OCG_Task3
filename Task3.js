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
      //console.log(`${key} == ${element.name}`);
      result[key] = element.name;
    }
  } catch (err) {
    console.error("Error reading or parsing file", err);
  }
  jResult = JSON.stringify(result, null, 2);
  await JSON_File_Creator(jResult, "sectors");
};

const industriesJson = async (name) => {
  var result = {};
  try {
    // Read the JSON file
    const data = await fs.readFile(`${name}.json`, "utf8");

    // Parse the JSON file
    const obj = JSON.parse(data);
    const list = obj.data;
    //Iterate over the JSON object
    for (const key in list) {
      const element = list[key];
      //console.log(`${key} == ${element.industries}`);
      list[key] = element.industries;
    }
    console.log(list);
    //iterating list which has the industries
    for (const key in list) {
      if (data.hasOwnProperty(key)) {
        //initializes an empty object for each top-level key to store sub-keys
        result[key] = {};
        // Iterate through each sub-key in the current key's object
        for (const subKey in list[key]) {
          if (list[key].hasOwnProperty(subKey)) {
            // Assign the 'name' property of the object corresponding to 'subKey' to the 'result' object
            result[key][subKey] = list[key][subKey].name;
          }
        }
      }
    }
  } catch (err) {
    console.error("Error reading or parsing file", err);
  }
  jResult = JSON.stringify(result, null, 2);
  await JSON_File_Creator(jResult, "industries");
};

const main = async () => {
  try {
    console.log("Waiting");

    await fetchDATA(
      "https://app.equidam.com/api/v3/industries?lang=en",
      "mainData"
    );
    await sectorsJson("mainData");
    await industriesJson("mainData");
  } catch (error) {
    console.log("Problem happened", error);
  } finally {
    console.log("SUCCESSFUL");
  }
};

main();
