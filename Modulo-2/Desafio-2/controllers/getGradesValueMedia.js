import getJsonGrades from '../libs/getJsonGrades.js';

/**
 * Rotorna a média do atributo { value } que bate com o params fornecido
 *
 * @param params - é um object json que vem com um type e subject utilizado
 * para filtragem dos dados
 */
const getGradesValueMedia = async (params) => {
  try {
    // realizando uma consulta no arquivo grades.json
    const json = await getJsonGrades();

    let accumulator = 0;
    let count = 0;
    for await (let grade of json.grades) {
      /**
       * se o grade bate com o params fornecido é realizado a acumulação do
       * atributo { value } e o incremento do count
       */
      if (grade.type === params.type && grade.subject === params.subject) {
        accumulator += grade.value;
        count++;
      }
    }

    return accumulator / count;
  } catch (error) {
    logger.error(`failed to get value media: ${error.message}`);
  }
};

export default getGradesValueMedia;
