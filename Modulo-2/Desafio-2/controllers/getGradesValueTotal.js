import getJsonGrades from '../libs/getJsonGrades.js';

/**
 * Rotorna o acumulado do atributo { value } que bate com o params fornecido
 *
 * @param params - é um object json que vem com um student e subject utilizado
 * para filtragem dos dados
 */
const getGradesValueTotal = async (params) => {
  try {
    // realizando uma consulta no arquivo grades.json
    const json = await getJsonGrades();

    let accumulator = 0;

    for await (let grade of json.grades) {
      // se o grade bate com o params fornecido é realizado a acumulação do atributo { value }
      if (
        grade.student === params.student &&
        grade.subject === params.subject
      ) {
        accumulator += grade.value;
      }
    }

    return accumulator;
  } catch (error) {
    logger.error(`failed to get total value: ${error.message}`);
  }
};

export default getGradesValueTotal;
