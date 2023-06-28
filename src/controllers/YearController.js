import Year from "../models/Year";
import YearMonth from "../models/YearMonth";

class YearController {
  async index(req, res) {
    try {
      const years = await Year.findAll({
        attributes: ['id', 'year'],
        order: [['year'], [YearMonth, 'month_num']],
        include: {
          model: YearMonth,
          attributes: ['id', 'month', 'month_num'],
        },
      });
      return res.json(years);
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

      const year = await Year.findByPk(id, {
        attributes: ['id', 'year'],
        order: [['year'], [YearMonth, 'month_num']],
        include: {
          model: YearMonth,
          attributes: ['month', 'month_num'],
        },
      });

      if (!year) {
        return res.status(400).json({
          errors: ['Year doesn\'t exists'],
        });
      }

      return res.json(year);
    } catch (e) {
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }
}

export default new YearController();
