#!/usr/bin/env node
import inquirer from 'inquirer';
import { questions } from './questions';
import { IAnswers } from './interface/answers.interface';
import { GenFile } from './controller/generate.controller';

class Init {
  constructor() {
    inquirer.prompt(questions).then((answers: IAnswers) => {
      GenFile.gen(answers);
    });
  }
}

new Init();
