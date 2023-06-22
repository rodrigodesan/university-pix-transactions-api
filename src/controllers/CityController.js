import City from "../models/City";

class CityController {
  async index(req, res) {
    try {
      const cities = await City.findAll({
        attributes: ['id', 'ibge_code', 'name', 'state'],
        order: [['name', 'ASC']],
      });
      return res.json(cities);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ["Erro na busca"],
      });
    }
  }
}

export default new CityController();
