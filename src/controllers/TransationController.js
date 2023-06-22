import { literal } from "sequelize";
import Transation from "../models/Transation";
import YearMonth from "../models/YearMonth";
import Year from "../models/Year";
import City from "../models/City";
import State from "../models/State";
// import Region from "../models/Region";

class TransationController {
  async index(___, res) {
    try {
      const transations = await Transation.findAll({
        order: [['year_month', 'ASC']],
        limit: 10000,
      });
      return res.json(transations);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ["Erro na busca"],
      });
    }
  }

  async maxAvgStateByTransationVlPerTransationQt(req, res) {
    try {
      const { year } = req.params;

      if (!year) {
        return res.status(400).json({
          errors: ['Missing YEAR'],
        });
      }
      const transationsState = await Transation.findAll({
        attributes: [
          [
            literal(`SUM("vl_individual_payer" + "vl_company_payer")/SUM("qt_individual_payer" + "qt_company_payer")`), 'average',
          ],
          [
            literal('"City->State"."name"'), 'state',
          ],
        ],
        include: [
          {
            model: City,
            include: [{ model: State, attributes: [], required: true }],
            attributes: [],
            required: true,
          },
          {
            model: YearMonth,
            include: [{
              model: Year,
              attributes: [],
              where: { year },
              required: true,
            }],
            attributes: [],
            required: true,
          },
        ],
        order: [['average', 'DESC']],
        group: ['City->State.id'],
        limit: 1,
      });
      return res.json(transationsState);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ["Erro na busca"],
      });
    }
  }
}

export default new TransationController();
