import express from 'express';
import insertGrade from '../controllers/insertGrade.js';
import getJsonGrades from '../libs/getJsonGrades.js';
import updateGrade from '../controllers/updateGrade.js';
import deleteGrade from '../controllers/deleteGrade.js';
import getID from '../controllers/getID.js';
import getGradesValueTotal from '../controllers/getGradesValueTotal.js';
import getGradesValueMedia from '../controllers/getGradesValueMedia.js';
import getRank from '../controllers/getRank.js';

const router = express.Router();

/**
 * 1. Crie um endpoint para criar uma grade. Este endpoint deverá receber como
 * parâmetros os campos student, subject, type e value. Essa grade deverá ser
 * salva no arquivo json grades.json, e deverá ter um id único associado.
 * No campo timestamp deverá ser salvo a data e hora do momento da inserção.
 * O endpoint deverá retornar o objeto da grade que foi criada.vA API deverá
 * garantir o incremento automático desse identificador, de forma que ele não
 * se repita entre os registros. Dentro do arquivo grades.json que foi fornecido
 * para utilização no desafio, o campo nextId já está com um valor definido.
 * Após a inserção é preciso que esse nextId seja incrementado e salvo no
 * próprio arquivo, de forma que na próxima inserção ele possa ser utilizado.
 */
router.post('/', async (req, res) => {
  try {
    await insertGrade(req.body);
    logger.info('Successful insertion!');
    res.status(200).send('Successful note insertion');
  } catch (error) {
    logger.error(`[POST] Error in requisition: ${error.message}`);
    res.status(400).send(`failed to insert the grade: ${error.message}`);
  }
});

/**
 * 2. Crie um endpoint para atualizar uma grade. Esse endpoint deverá receber
 * como parâmetros o id da grade a ser alterada e os campos student, subject,
 * type e value. O endpoint deverá validar se a grade informada existe,
 * caso não exista deverá retornar um erro. Caso exista, o endpoint deverá
 * atualizar as informações recebidas por parâmetros no registro, e realizar
 * sua atualização com os novos dados alterados no arquivo grades.json.
 */
router.put('/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);

    if ((await updateGrade(id, req.body)) === false) {
      res.status(404).send('Sorry, grade not found');
      logger.info('Grade not found');
    } else {
      res.json(req.body);
      logger.info('updated grade');
    }
  } catch (error) {
    logger.error(`[PUT] Error in requisition: ${error.message}`);
    res.status(400).send(`failed to update the grade: ${error.message}`);
  }
});

/**
 * 3. Crie um endpoint para excluir uma grade. Esse endpoint deverá receber
 * como parâmetro o id da grade e realizar sua exclusão do arquivo grades.json.
 */
router.delete('/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);

    if ((await deleteGrade(id)) === false) {
      res.status(404).send('Sorry, grade not found');
      logger.info('Grade not found');
    } else {
      res.send('deleted grade');
      logger.info('deleted grade');
    }
  } catch (error) {
    logger.error(`[DELETE] Error in requisition: ${error.message}`);
    res.status(400).send(`failed to delete the grade: ${error.message}`);
  }
});

/**
 * 4. Crie um endpoint para consultar uma grade em específico. Esse endpoint
 * deverá receber como parâmetro o id da grade e retornar suas informações.
 */
router.get('/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);

    const grade = await getID(id);

    if (grade === false) {
      res.status(404).send('Sorry, grade not found');
      logger.info('[GET:ID] Grade not found');
    } else {
      res.json(grade);
    }
  } catch (error) {
    logger.error('[GET:ID] Error in requisition');
    res.status(400).send(`failed to get the grades: ${error.message}`);
  }
});

/**
 * 5. Crie um endpoint para consultar a nota total de um aluno em uma
 * disciplina. O endpoint deverá receber como parâmetro o student e o subject,
 * e realizar a soma de todas as notas de atividades correspondentes àquele
 * subject, para aquele student. O endpoint deverá retornar a soma da
 * propriedade value dos registros encontrados.
 */
router.get('/total/value', async (req, res) => {
  try {
    const params = req.body;
    const valueTotal = await getGradesValueTotal(params);
    res.send(`Value total: ${valueTotal}`);
  } catch (error) {
    console.log(error);
    logger.error('[GET/total/value] Error in requisition');
    res.status(400).send(`failed to get grades total value: ${error.message}`);
  }
});

/**
 * 6. Crie um endpoint para consultar a média das grades de determinado
 * subject e type. O endpoint deverá receber como parâmetro um subject e um
 * type, e retornar a média. A média é calculada somando o registro value de
 * todos os registros que possuem o subject e type informados, dividindo pelo
 * total de registros que possuem este mesmo subject e type.
 */
router.get('/total/media', async (req, res) => {
  try {
    const params = req.body;
    const media = await getGradesValueMedia(params);
    res.send(`Media: ${media}`);
  } catch (error) {
    console.log(error);
    logger.error('[GET/total/media] Error in requisition');
    res.status(400).send(`failed to get grades media: ${error.message}`);
  }
});

/**
 * 7. Crie um endpoint para retornar as três melhores grades de acordo com
 * determinado subject e type. O endpoint deve receber como parâmetro um
 * subject e um type, e retornar um array com os três registros de maior value
 * daquele subject e type. A ordem deve ser do maior para o menor.
 */
router.get('/top/:qtd', async (req, res) => {
  try {
    const params = req.body;
    const rank = await getRank(params);
    res.json(rank);
  } catch (error) {
    console.log(error);
    logger.error('[GET/top/position] Error in requisition');
    res.status(400).send(`failed to get the best grades: ${error.message}`);
  }
});

router.get('/', async (_, res) => {
  try {
    const json = await getJsonGrades();
    res.json(json.grades);
  } catch (error) {
    logger.error('[GET] Error in requisition');
    res.status(400).send(`failed to get the grades: ${error.message}`);
  }
});

export default router;
