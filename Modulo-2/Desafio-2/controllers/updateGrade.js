import getJsonGrades from '../libs/getJsonGrades.js';
import setJsonGrades from '../libs/setJsonGrades.js';

/**
 * Faz uma alteração em uma grade específica
 *
 * @params id - id da grade que pretende-se atualizar
 *
 * @params grade - os novos dados que serão inseridos / atualizado
 */
const updateGrade = async (id, grade) => {
  try {
    // realizando uma consulta no arquivo grades.json
    let json = await getJsonGrades();

    // verificando a existência da grade
    const currentIndex = await json.grades.findIndex(
      (grade) => grade.id === id
    );

    // validando a existência da grade
    if (currentIndex === -1) {
      return false;
    } else {
      // atualizando os dados
      json.grades[currentIndex].student = grade.student;
      json.grades[currentIndex].subject = grade.subject;
      json.grades[currentIndex].type = grade.type;
      json.grades[currentIndex].value = grade.value;

      // inserindo os novos dados no arquivo grades.json
      await setJsonGrades(json);

      logger.info('grade updated');

      return true;
    }
  } catch (error) {
    logger.error(`failed to update grade: ${error.message}`);
  }
};

export default updateGrade;
