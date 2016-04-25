#!/usr/bin/env node

import program from 'commander';


import features from './commands/features';
import releases from './commands/releases';
import login from './commands/login';
import addfeature from './commands/addfeature';
import updatefeature from './commands/updatefeature';


// ====== START COMMANDS
// define out program cli commands


program
  .command('features [releaseId]')
  .option('-a, --assigned [assigned]', 'filter by assigned')
  .description('get list of features for a release')
  .action(features)

program
  .command('releases [productId]')
  .description('get list of releases for a product')
  .action(releases)

program
  .command('login [username] [password]')
  .description('login to Aha, creates a hidden file in your home folder')
  .action(login)

program
  .command('addfeature [releaseId] [featureName] [workflowKind] [workflowStatus]')
  .description('add a new feature to a release')
  .action(addfeature)

program
  .command('updatefeature [featureId] [workflowStatus]')
  .description('update the status of a feature')
  .action(updatefeature)


// ====== END COMMANDS

// Process the cli input into commands
program.parse(process.argv);
