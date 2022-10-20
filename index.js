import {
  ComprehendClient,
  BatchDetectDominantLanguageCommand,
} from "@aws-sdk/client-comprehend";
import * as dotenv from "dotenv";
dotenv.config();

const client = new ComprehendClient({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_SECRET_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const params = {
  TextList: [
   "STRING_VALUE",
    "Das funktioniert sehr gut",
    "این خیلی خوب کار می کند"
    /* more items */
  ],
};

const command = new BatchDetectDominantLanguageCommand(params);

const printLanguages = (texts, languages) => {
  texts.forEach((text, i)=>{
    console.log(`The Language for: ${text} is ${languages[i].Languages[0].LanguageCode}`)
  });
}

// async/await.
try {
  const data = await client.send(command);
  // process data.
  printLanguages(params.TextList, data.ResultList)
} catch (error) {
  // error handling.
  console.error(error);
} finally {
  // finally.
}
