import fs from 'node:fs';
import path from 'node:path';
import shelljs from 'shelljs';
import { EGitName } from './../enum/git-name.enum';
import { IAnswers } from './../interface/answers.interface';
import { EchoicesBoilerPlate } from './../enum/choices-boilerplate.enum';

class GenerateController {
  public gen(anwsers: IAnswers) {
    try {
      switch (anwsers.tech) {
        case EchoicesBoilerPlate.NODEJS_TS:
          this._execPath(EGitName.NODEJS_TS, anwsers.folderName);
          break;
        case EchoicesBoilerPlate.SCSS:
          this._execPath(EGitName.SCSS, anwsers.folderName);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  private _execPath(gitName: string, folderName: string) {
    try {
      shelljs.cd(path.resolve());
      shelljs.exec(`git clone git@github.com:MIKEMARQUEZINI/${gitName}.git`);

      fs.renameSync(
        `${path.join(path.resolve(), gitName)}`,
        `${path.join(path.resolve(), folderName)}`,
      );
      console.log('Arquivo criado com Sucesso!');
      return shelljs.exit();
    } catch (error) {
      console.log(error);
    }
  }
}

export const GenFile = new GenerateController();
