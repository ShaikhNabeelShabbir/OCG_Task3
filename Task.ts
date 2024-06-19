import { promises as fsPromises } from "fs";

// Function to fetch data from a URL and save it as a JSON file
const fetchData = async (url: string, name: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    const data = await response.json();
    const JData = JSON.stringify(data);
    await jsonFileCreator(JData, name);
  } catch (error) {
    console.error(error);
  }
};

// Write JSON string to a file
const jsonFileCreator = async (json_string: string, name: string) => {
  try {
    await fsPromises.writeFile(`${name}.json`, json_string);
    console.log("Data written to file");
  } catch (err) {
    console.error("Error writing file", err);
  }
};

// Function to extract sectors from JSON data
const sectorsJson = async (name: string) => {
  let result: { [key: string]: string } = {};
  try {
    // Read the JSON file
    const data = await fsPromises.readFile(`${name}.json`, "utf8");

    // Parse the JSON file
    const obj = JSON.parse(data);
    const list: {
      [key: string]: {
        name: string;
        industries: { [key: string]: { name: string } };
      };
    } = obj.data;

    // Iterate over the JSON object
    for (const key in list) {
      if (list.hasOwnProperty(key)) {
        result[key] = list[key].name;
      }
    }
    //    console.log("Sectors:");
    //    console.log(result);
  } catch (err) {
    console.error("Error reading or parsing file", err);
  }
  const jResult = JSON.stringify(result, null, 2);
  await jsonFileCreator(jResult, "sectors");
};

// Function to extract industries from JSON data
const industriesJson = async (name: string) => {
  let result: { [key: string]: { [key: string]: string } } = {};
  try {
    // Read the JSON file
    const data = await fsPromises.readFile(`${name}.json`, "utf8");

    // Parse the JSON file
    const obj = JSON.parse(data);
    const list: {
      [key: string]: { industries: { [key: string]: { name: string } } };
    } = obj.data;

    // Iterate over the JSON object
    for (const key in list) {
      if (list.hasOwnProperty(key)) {
        const industries = list[key].industries;
        result[key] = {};

        // Iterate through each sub-key in the current key's object
        for (const subKey in industries) {
          if (industries.hasOwnProperty(subKey)) {
            result[key][subKey] = industries[subKey].name;
          }
        }
      }
    }
    //  console.log("Industries:");
    // console.log(result);
  } catch (err) {
    console.error("Error reading or parsing file", err);
  }
  const jResult = JSON.stringify(result, null, 2);
  await jsonFileCreator(jResult, "industries");
};

// Function to extract activities from JSON data
const activitiesJson = async (name: string) => {
  let result: { [key: string]: { [key: string]: { [key: string]: string } } } =
    {};
  try {
    // Read the JSON file
    const data = await fsPromises.readFile(`${name}.json`, "utf8");

    // Parse the JSON file
    const obj = JSON.parse(data);
    const list: {
      [key: string]: {
        industries: {
          [key: string]: { activities: { [key: string]: { name: string } } };
        };
      };
    } = obj.data;

    // Iterate over the JSON object
    for (const key in list) {
      if (list.hasOwnProperty(key)) {
        const industries = list[key].industries;
        result[key] = {};

        // Iterate through each industry in the current key's object
        for (const industryKey in industries) {
          if (industries.hasOwnProperty(industryKey)) {
            const activities = industries[industryKey].activities;
            result[key][industryKey] = {};

            // Iterate through each activity in the current industry
            for (const activityKey in activities) {
              if (activities.hasOwnProperty(activityKey)) {
                result[key][industryKey][activityKey] =
                  activities[activityKey].name;
              }
            }
          }
        }
      }
    }
    //console.log("Activities:");
    //console.log(result);
  } catch (err) {
    console.error("Error reading or parsing file", err);
  }
  const jResult = JSON.stringify(result, null, 2);
  await jsonFileCreator(jResult, "activities");
};

// Main function to orchestrate fetching and processing data
const main = async () => {
  try {
    console.log("Waiting");

    await fetchData(
      "https://app.equidam.com/api/v3/industries?lang=en",
      "mainData"
    );
    await sectorsJson("mainData");
    await industriesJson("mainData");
    await activitiesJson("mainData");
  } catch (error) {
    console.log("Problem happened", error);
  } finally {
    console.log("SUCCESSFUL");
  }
};

main();
