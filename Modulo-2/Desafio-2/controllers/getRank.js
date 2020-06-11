import getJsonGrades from '../libs/getJsonGrades.js';

/**
 * Returna os três grades que possuem os atributor { value } mais alto de acordo
 * com os params passado a função.
 *
 * È retornado um array de json
 *
 * @param params é um object json que vem com um type e subject utilizado para
 * filtragem dos dados
 */
const getRank = async (params) => {
  try {
    // realizando uma consulta no arquivo grades.json
    const json = await getJsonGrades();

    /**
     * I   - Filtrando os elementos que bate com os params fornecidos
     * II  - Ordenando os alementos filtrados com base no seu atributo { value }
     * III - Retirando apenas os três grade de mais alto { value }
     */
    let rankGrades = await json.grades
      .filter(
        (grade) =>
          grade.type === params.type && grade.subject === params.subject
      )
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);

    return rankGrades;
  } catch (error) {
    logger.error(`failed to get bast grade: ${error.message}`);
  }
};

export default getRank;
