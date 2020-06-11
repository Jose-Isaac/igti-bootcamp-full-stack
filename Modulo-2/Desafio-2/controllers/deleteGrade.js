import getJsonGrades from '../libs/getJsonGrades.js';
import setJsonGrades from '../libs/setJsonGrades.js';

/**
 * Deleta um grede específico
 *
 * @param id - id da grade que pretende-se deleta
 */
const deleteGrade = async (id) => {
  try {
    // realizando uma consulta no arquivo grades.json
    let json = await getJsonGrades();

    // verificando a existência do grade
    const currentIndex = await json.grades.findIndex(
      (grade) => grade.id === id
    );

    // Validando a existência do grade
    if (currentIndex === -1) {
      return false;
    } else {
      // removendo o grede
      const grades = await json.grades.filter((grade) => grade.id !== id);
      json.grades = grades;

      // gravando o dados atualizados
      await setJsonGrades(json);
      return true;
    }
  } catch (error) {
    logger.error(`failed to delete grade: ${error.message}`);
  }
};

export default deleteGrade;
