// --------------------------------------------------------------------------- //
// Discord Account Onliner                                                     //
// Copyright (c) 2024 @0ixe                                                    //
// Website: https://0ixe.site/                                                 //
// Discord: https://0ixe.site/discord                                          //
// Github : https://github.com/Demon-X14/D-Onliner                             //
// All rights reserved.                                                        //
//                                                                             //
// This application is the intellectual property of @0ixe.                     //
// Unauthorized distribution, modification,                                    //
// or use is strictly prohibited.                                              //
//                                                                             //
// Discord Account Onliner is a tool designed                                  //
// to keep your Discord accounts online and active.                            //
//                                                                             //
// For more information, updates, or to report issues, please visit my website //
// or join my Discord community.                                               //
// --------------------------------------------------------------------------- //


import { Client } from 'discord.js-selfbot-v13'; // Importing the Discord client for self-bot functionality
import inquirer from 'inquirer'; // Importing inquirer for the user input

import { readFileSync, writeFileSync } from 'fs'; // Importing file system methods for reading and writing files obviously

const tokensFile = 'config/tokens.txt'; // Path to the file where tokens are stored

async function main() {
  let tokens;
  try {
    // Check if the tokens file is empty
    if (!readFileSync(tokensFile, 'utf8')){
      // If empty, prompt the user to enter their token(s)
      const answers: { token: string } = await inquirer.prompt([
        {
          type: 'input',
          name: 'token',
          message: 'Enter your token(s) separated by commas:'
        }
      ]);
      // Split the input string into an array of tokens
      tokens = answers.token.split(',');
      // Write the tokens to the file for future use
      writeFileSync(tokensFile, tokens.join(','));
    } else {
      // If the file is not empty, read the tokens from the file
      tokens = readFileSync(tokensFile, 'utf8').split(',');
    }

    // Loop through each token and log in to Discord
    await Promise.all(tokens.map(async (token) => {
      const client = new Client(); // Create a new Discord client instance
      client.on('ready', () => {
        console.log(`Logged in as ${client.user?.tag}`); // Log the username(s) when ready
      });
      // Attempt to log in with the token
      try {
        await client.login(token.trim());
      } catch (error: any) {
        if (error.message.includes('Invalid token')) {
          console.error(`Invalid token provided: ${token.trim()}. Please check your token.`);
        } else {

        console.error(`Failed to log in with token: ${token.trim()}. Error: ${error.message}`);
      }}
    }));
  } catch (error: any) {
    console.error(`An error occurred: ${error.message}`);
  }
}

main();