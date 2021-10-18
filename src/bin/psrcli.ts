#!/usr/local/bin/node
import { program } from 'commander';
import fs from 'fs';
import { MetricService } from '../MetricService';

program.requiredOption('-p, --path <path>', 'Markup file must have path');

program.parse(process.argv);
const options = program.opts();

const fileContent = fs.readFileSync(options.path).toString('utf8');
const fileContentJson = JSON.parse(fileContent.toString());

const psrResult = new MetricService().calculate(fileContentJson);
console.log(JSON.stringify(psrResult));
