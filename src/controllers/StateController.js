import State from "../models/State";

class StateController {
  async index(req, res) {
    try {
      const states = await State.findAll({
        attributes: ['id', 'ibge_code', 'name', 'region'],
        order: [['name', 'ASC']],
      });
      return res.json(states);
    } catch (e) {
      return res.status(400).json({
        errors: ["Erro na busca"],
      });
    }
  }
}

export default new StateController();
