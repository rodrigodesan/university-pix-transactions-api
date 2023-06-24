import City from "../models/City";
import State from "../models/State";

class StateController {
  async index(req, res) {
    try {
      const states = await State.findAll({
        attributes: ['id', 'ibge_code', 'name', 'region'],
        order: [['name'], [City, 'name']],
        include: {
          model: City,
          attributes: ['id', 'ibge_code', 'name'],
        },
      });
      return res.json(states);
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

      const state = await State.findByPk(id, {
        attributes: ['id', 'ibge_code', 'name', 'region'],
        order: [['name'], [City, 'name']],
        include: {
          model: City,
          attributes: ['id', 'ibge_code', 'name'],
        },
      });

      if (!state) {
        return res.status(400).json({
          errors: ['State doesn\'t exists'],
        });
      }

      return res.json(state);
    } catch (e) {
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }
}

export default new StateController();
