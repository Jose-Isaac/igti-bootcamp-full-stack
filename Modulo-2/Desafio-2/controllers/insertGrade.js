import getJsongrades from '../libs/getJsonGrades.js';
import setJsonGrades from '../libs/setJsonGrades.js';

/**
 * Faz a inserção de uma nova grade
 *
 * @param grade  - elemento que sera inserido
 */
const insertGrade = async (grade) => {
  try {
    // realizando uma consulta no arquivo grades.json
    let json = await getJsongrades();

    // obtendo a data atual
    // A RegEx do replace remove as aspas duplas que são inseridas após o JSON.stringify
    const date = JSON.stringify(new Date()).replace(/\"/g, '');

    // Inserido o id para o novo grade mais a sua data de criação
    grade = { id: json.nextId, ...grade, timestamp: date };

    json.nextId++;

    // inserindo os novos dados no arquivo grades.json
    await json.grades.push(grade);
    await setJsonGrades(json);

    logger.info('grade insert in grades.json');
  } catch (error) {
    logger.error('failed to insert grade in grades.json file');
  }
};

export default insertGrade;
