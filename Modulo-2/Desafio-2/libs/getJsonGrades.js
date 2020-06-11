import { promises } from 'fs';

const readFile = promises.readFile;

// path para o arquivo de notas
const pathJsonGrades = './data/grades.json';

/**
 * Realiza a leitura dos dados
 */
const getJsonGrades = async () => {
  try {
    const data = await readFile(pathJsonGrades, 'utf-8');

    logger.info('Grades.json file open!');

    return await JSON.parse(data);
  } catch (error) {
    logger.error(`failed to read the grades.json file: ${error.message}`);
  }
};

export default getJsonGrades;
