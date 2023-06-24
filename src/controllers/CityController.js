import City from "../models/City";

class CityController {
  async index(req, res) {
    try {
      const cities = await City.findAll({
        attributes: ['id', 'ibge_code', 'name', 'state'],
        order: [['name']],
      });
      return res.json(cities);
    } catch (e) {
      console.log(e);
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

      const city = await City.findByPk(id, {
        attributes: ['id', 'ibge_code', 'name', 'state'],
      });

      if (!city) {
        return res.status(400).json({
          errors: ['City doesn\'t exists'],
        });
      }

      return res.json(city);
    } catch (e) {
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }
}

export default new CityController();
