import getJsonGrades from '../libs/getJsonGrades.js';

/**
 * Returna um json com os dados da grade
 *
 * @param id - id da grade que pretende-se obter
 */
const getID = async (id) => {
  try {
    // realizando uma consulta no arquivo grades.json
    const json = await getJsonGrades();

    // Verificando a existência do grade
    const grade = await json.grades.find((grade) => grade.id === id);

    // Validadando a existência do grade
    if (grade === undefined) {
      return false;
    } else {
      return grade;
    }
  } catch (error) {
    logger.error(`failed to get grade id: ${error.message}`);
  }
};

export default getID;
