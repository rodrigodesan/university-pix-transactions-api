import Region from "../models/Region";

class RegionController {
  async index(req, res) {
    try {
      const regions = await Region.findAll({
        attributes: ['id', 'acronym', 'name'],
        order: [['name', 'ASC']],
      });
      return res.json(regions);
    } catch (e) {
      return res.status(400).json({
        errors: ["Erro na busca"],
      });
    }
  }
}

export default new RegionController();
