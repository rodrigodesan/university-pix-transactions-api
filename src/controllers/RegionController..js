import Region from "../models/Region";
import State from "../models/State";

class RegionController {
  async index(req, res) {
    try {
      const regions = await Region.findAll({
        attributes: ['id', 'acronym', 'name'],
        order: [['name'], [State, 'name']],
        include: {
          model: State,
          attributes: ['id', 'ibge_code', 'name'],
        },
      });
      return res.json(regions);
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

      const region = await Region.findByPk(id, {
        attributes: ['id', 'acronym', 'name'],
        order: [['name'], [State, 'name']],
        include: {
          model: State,
          attributes: ['id', 'ibge_code', 'name'],
        },
      });

      if (!region) {
        return res.status(400).json({
          errors: ['Region doesn\'t exists'],
        });
      }

      return res.json(region);
    } catch (e) {
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }
}

export default new RegionController();
