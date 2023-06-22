import Year from "../models/Year";

class YearController {
  async index(req, res) {
    try {
      const years = await Year.findAll({
        attributes: ['id', 'year'],
        order: [['year', 'ASC']],
      });
      return res.json(years);
    } catch (e) {
      return res.status(400).json({
        errors: ["Erro na busca"],
      });
    }
  }
}

export default new YearController();
