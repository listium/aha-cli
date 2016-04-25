#!/usr/bin/env node

import program from 'commander';


import features from './commands/features';
import releases from './commands/releases';
import login from './commands/login';
import addfeature from './commands/addfeature';
import updatefeature from './commands/updatefeature';
import comment from './commands/comment';


// ====== START COMMANDS
// define out program cli commands


program
  .command('features [releaseId]')
  .option('-a, --assigned [assigned]', 'Filter by assigned user (email, or blank for self)')
  .option('-s, --search [search]', 'Search for text in feature names')
  .description('Get list of features for a release')
  .action(features)

program
  .command('releases [productId]')
  .description('Get a list of releases for a product')
  .action(releases)

program
  .command('login [username] [password]')
  .description('Login to Aha, creates a hidden file in your home folder')
  .action(login)

program
  .command('addfeature [releaseId] [featureName] [workflowKind] [workflowStatus]')
  .description('Add a new feature to a release (defaults = type: Feature; status: Ready for Development).')
  .action(addfeature)

program
  .command('updatefeature [featureId] [workflowStatus]')
  .description('update the status of a feature')
  .action(updatefeature)

program
  .command('comment [featureId] [comment]')
  .description('Add a comment to a feature')
  .action(comment)

// ====== END COMMANDS

// Process the cli input into commands
program.parse(process.argv);
