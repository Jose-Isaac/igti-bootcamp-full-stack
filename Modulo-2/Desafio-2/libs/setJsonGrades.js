import { promises } from 'fs';

const writeFile = promises.writeFile;

// path para o arquivo de notas
const pathJsonGrades = './data/grades.json';

/**
 * Realiza a inscrição dos novos dados
 *
 * @param  grades - dados a serem inseridos
 */
const setJsonGrades = async (grades) => {
  try {
    await writeFile(pathJsonGrades, JSON.stringify(grades));
    logger.info('grates.json file write');
  } catch (error) {
    logger.error(`failed to write the grates.json file: ${error.message}`);
  }
};

export default setJsonGrades;
