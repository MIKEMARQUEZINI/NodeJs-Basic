import path from 'path';
import fs from 'fs';
import { EchoicesBoilerPlate } from './enum/choices-boilerplate.enum';
import { EErros } from './enum/erros.enum';
import { EGitName } from './enum/git-name.enum';

export const questions = [
  {
    type: 'list',
    name: 'tech',
    message: 'Qual Boilerplate devo criar?',
    choices: [EchoicesBoilerPlate.NODEJS_TS, EchoicesBoilerPlate.SCSS],
  },
  {
    type: 'input',
    name: 'folderName',
    message: 'Qual nome devo dar para pasta do Projeto?',
    validate(folderName: string) {
      // folderName - Não pode ser Null
      // - 'Insirá um valor para o nome!',
      if (!folderName) return EErros.ERROR_NULL;

      // não podemos ter caracteres especiais, exeto -, _, ' '
      // - 'Não pode conter caracteres especiais'
      if (/[^\w\s-]/.test(folderName)) return EErros.ERROR_SPECIAL_CHARACTERS;

      // não pode existir pasta com o mesmo nome da repo do github
      //  - 'Não é possível criar a pasta com este nome!'
      if (folderName === EGitName.NODEJS_TS) return EErros.ERROR_GIT_NAME;

      try {
        // não pode existir pasta com o mesmo nome do folderName
        // - 'Já existe uma pasta com este nome!'
        const dir = path.resolve(folderName);
        fs.accessSync(dir, fs.constants.R_OK);
        return EErros.ERROR_INVALID_FOLDER;
      } catch (error) {
        /*empty*/
      }

      return true;
    },
  },
];
