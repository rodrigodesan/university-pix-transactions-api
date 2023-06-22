import YearMonth from "../models/YearMonth";

class YearMonthController {
  async index(req, res) {
    try {
      const yearMonths = await YearMonth.findAll({
        attributes: ['id', 'month_num', 'month', 'year'],
        order: [['month_num', 'ASC']],
      });
      return res.json(yearMonths);
    } catch (e) {
      return res.status(400).json({
        errors: ["Erro na busca"],
      });
    }
  }
}

export default new YearMonthController();
