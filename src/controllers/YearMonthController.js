import YearMonth from "../models/YearMonth";

class YearMonthController {
  async index(req, res) {
    try {
      const yearMonths = await YearMonth.findAll({
        attributes: ['id', 'month_num', 'month', 'year'],
        order: [['year'], ['month_num']],
      });
      return res.json(yearMonths);
    } catch (e) {
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }

      const yearMonth = await YearMonth.findByPk(id, {
        attributes: ['id', 'month', 'month_num', 'year'],
      });

      if (!yearMonth) {
        return res.status(400).json({
          errors: ['YearMonth doesn\'t exists'],
        });
      }

      return res.json(yearMonth);
    } catch (e) {
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }
}

export default new YearMonthController();
