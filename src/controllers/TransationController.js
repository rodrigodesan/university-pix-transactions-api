import { literal, fn, col } from "sequelize";
import Transation from "../models/Transation";
import YearMonth from "../models/YearMonth";
import Year from "../models/Year";
import City from "../models/City";
import State from "../models/State";
import Region from "../models/Region";

class TransationController {
  async index(req, res) {
    try {
      const transations = await Transation.findAll({
        order: [['year_month']],
        attributes: ['id', 'vl_individual_payer', 'qt_individual_payer', 'vl_company_payer', 'qt_company_payer', 'vl_individual_receiver', 'qt_individual_receiver', 'vl_company_receiver', 'qt_company_receiver', 'city', 'year_month'],
      });
      return res.json(transations);
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
      const transation = await Transation.findByPk(id, {
        attributes: ['id', 'vl_individual_payer', 'qt_individual_payer', 'vl_company_payer', 'qt_company_payer', 'vl_individual_receiver', 'qt_individual_receiver', 'vl_company_receiver', 'qt_company_receiver', 'city', 'year_month'],
      });

      if (!transation) {
        return res.status(400).json({
          errors: ['Transation doesn\'t exists'],
        });
      }
      return res.json(transation);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }

  async maxMinAvgStateByVlPerQt(req, res) {
    try {
      const { year, order } = req.query;

      if (!year) {
        return res.status(400).json({
          errors: ['Missing YEAR'],
        });
      }
      const transationsState = await Transation.findAll({
        attributes: [
          [
            literal(`SUM("vl_individual_payer" + "vl_company_payer")/SUM("qt_individual_payer" + "qt_company_payer")`),
            'average',
          ],
          [literal('"City->State"."name"'), 'state'],
          [literal('"City->State"."ibge_code"'), 'ibge_code'],
        ],
        include: [
          {
            model: City,
            include: { model: State, attributes: [], required: true },
            attributes: [],
            required: true,
          },
          {
            model: YearMonth,
            include: {
              model: Year,
              attributes: [],
              where: { id: year },
              required: true,
            },
            attributes: [],
            required: true,
          },
        ],
        order: [['average', order && order.match(/ASC|DESC|asc|desc/) ? order : 'ASC']],
        group: ['City->State.id'],
        limit: 1,
      });

      return res.json(transationsState[0]);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }

  async maxPixAvgRegion(req, res) {
    try {
      const { year } = req.query;

      if (!year) {
        return res.status(400).json({
          errors: ['Missing YEAR'],
        });
      }

      const transationsRegion = await Transation.findAll({
        attributes: [
          [
            literal(`SUM("vl_individual_receiver" + "vl_company_receiver")/SUM("qt_individual_receiver" + "qt_company_receiver")`),
            'average',
          ],
          [literal('"City->State->Region"."name"'), 'region'],
          [literal('"City->State->Region"."acronym"'), 'acronym'],
        ],
        include: [
          {
            model: City,
            include: {
              model: State,
              attributes: [],
              required: true,
              include: { model: Region, attributes: [], required: true },
            },
            attributes: [],
            required: true,
          },
          {
            model: YearMonth,
            include: {
              model: Year,
              attributes: [],
              where: { id: year },
              required: true,
            },
            attributes: [],
            required: true,
          },
        ],
        order: [['average', 'DESC']],
        group: ['City->State->Region.id'],
        limit: 1,
      });

      return res.json(transationsRegion[0]);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }

  async pixByRegion(req, res) {
    try {
      const { year } = req.query;

      if (!year) {
        return res.status(400).json({
          errors: ['Missing YEAR'],
        });
      }

      const transationRegions = await Transation.findAll({
        attributes: [
          [
            literal(`SUM("qt_individual_receiver" + "qt_company_receiver" + "qt_individual_payer" + "qt_company_payer")`),
            'pix_number',
          ],
          [literal('"City->State->Region"."name"'), 'region'],
          [literal('"City->State->Region"."acronym"'), 'acronym'],
        ],
        include: [
          {
            model: City,
            attributes: [],
            required: true,
            include: {
              model: State,
              attributes: [],
              required: true,
              include: { model: Region, attributes: [], required: true },
            },
          },
          {
            model: YearMonth,
            attributes: [],
            required: true,
            include: {
              model: Year,
              attributes: [],
              required: true,
              where: { id: year },
            },
          },
        ],
        order: [['pix_number', 'DESC']],
        group: ['City->State->Region.id'],
      });

      return res.json(transationRegions);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }

  async citiesWithMostIndividualTransations(req, res) {
    try {
      const { year, months } = req.query;

      if (!year || !months) {
        return res.status(400).json({
          errors: ['Missing YEAR or MONTHS'],
        });
      }

      const transationsCities = await Transation.findAll({
        attributes: [
          [
            literal(`SUM("qt_individual_receiver" + "qt_individual_payer")`),
            'pix_individual',
          ],
          [literal('"City"."name"'), 'city'],
          [literal('"City->State"."name"'), 'state'],
          [literal('"City"."ibge_code"'), 'city_code'],
          [literal('"City->State"."ibge_code"'), 'state_code'],
        ],
        include: [
          {
            model: City,
            include: { model: State, attributes: [], required: true },
            attributes: [],
            required: true,
          },
          {
            model: YearMonth,
            attributes: [],
            required: true,
            where: { id: months.split(',') },
            include: {
              model: Year,
              attributes: [],
              where: { id: year },
              required: true,
            },
          },
        ],
        order: [['pix_individual', 'DESC']],
        group: ['City.id', 'City->State.id'],
        limit: 10,
      });

      return res.json(transationsCities);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }

  async higherAvgOnVlCompanyPayer(req, res) {
    try {
      const { minAvg } = req.query;

      if (!minAvg || Number.isNaN(minAvg)) {
        return res.status(400).json({
          errors: ['Missing or not numeric minAvg'],
        });
      }

      const transationsCities = await Transation.findAll({
        attributes: [
          [fn('avg', col('vl_company_payer')), 'average'],
          [literal('"City"."name"'), 'city'],
          [literal('"City->State"."name"'), 'state'],
          [literal('"City"."ibge_code"'), 'city_code'],
          [literal('"City->State"."ibge_code"'), 'state_code'],
        ],
        include: [
          {
            model: City,
            include: { model: State, attributes: [], required: true },
            attributes: [],
            required: true,
          },
          {
            model: YearMonth,
            attributes: [],
            required: true,
            include: {
              model: Year,
              attributes: [],
              required: true,
            },
          },
        ],
        having: literal(`AVG("vl_company_payer") > ${minAvg}`),
        order: [['average', 'DESC']],
        group: ['City.id', 'City->State.id'],
      });

      return res.json(transationsCities);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }

  async citiesDifInTransationVl(req, res) {
    try {
      const { year, order } = req.query;

      if (!year) {
        return res.status(400).json({
          errors: ['Missing YEAR'],
        });
      }

      const transationsCities = await Transation.findAll({
        attributes: [
          [
            literal(`SUM(("vl_individual_receiver" + "vl_company_receiver")-("vl_individual_payer" + "vl_company_payer"))`),
            'dif_rec_pay',
          ],
          [literal('"City"."name"'), 'city'],
          [literal('"City->State"."name"'), 'state'],
          [literal('"City"."ibge_code"'), 'city_code'],
          [literal('"City->State"."ibge_code"'), 'state_code'],
        ],
        include: [
          {
            model: City,
            include: { model: State, attributes: [], required: true },
            attributes: [],
            required: true,
          },
          {
            model: YearMonth,
            attributes: [],
            required: true,
            include: {
              model: Year,
              attributes: [],
              where: { id: year },
              required: true,
            },
          },
        ],
        order: [['dif_rec_pay', order && order.match(/ASC|DESC|asc|desc/) ? order : 'ASC']],
        group: ['City.id', 'City->State.id'],
        limit: 10,
      });

      return res.json(transationsCities);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }

  async highestTransationVlStateYear(req, res) {
    try {
      const { year, state } = req.query;

      if (!year || !state) {
        return res.status(400).json({
          errors: ['Missing YEAR or STATE'],
        });
      }

      const transationsMonth = await Transation.findAll({
        attributes: [
          [
            literal(`SUM(("qt_individual_receiver" + "qt_company_receiver")+("qt_individual_payer" + "qt_company_payer"))`),
            'trans_total',
          ],
          [literal('"YearMonth"."month"'), 'month'],
          [literal('"YearMonth"."month_num"'), 'month_num'],
        ],
        include: [
          {
            model: City,
            include: {
              model: State,
              attributes: [],
              required: true,
              where: { id: state },
            },
            attributes: [],
            required: true,
          },
          {
            model: YearMonth,
            attributes: [],
            required: true,
            include: {
              model: Year,
              attributes: [],
              where: { id: year },
              required: true,
            },
          },
        ],
        order: [['trans_total', 'desc']],
        group: ['YearMonth.id'],
        limit: 1,
      });

      return res.json(transationsMonth[0]);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }

  async highestTransationVlRegion(req, res) {
    try {
      const { region } = req.query;

      if (!region) {
        return res.status(400).json({
          errors: ['Missing STATE'],
        });
      }

      const transationsMonth = await Transation.findAll({
        attributes: [
          [
            literal(`"qt_individual_receiver" + "qt_company_receiver"+"qt_individual_payer" + "qt_company_payer"`),
            'trans_total',
          ],
          [literal('"City"."name"'), 'city'],
          [literal('"City"."ibge_code"'), 'city_code'],
          [literal('"City->State"."name"'), 'state'],
          [literal('"City->State"."ibge_code"'), 'state_code'],
          [literal('"YearMonth"."month"'), 'month'],
          [literal('"YearMonth"."month_num"'), 'month_num'],
          [literal('"YearMonth->Year"."year"'), 'year'],
        ],
        include: [
          {
            model: City,
            include: {
              model: State,
              attributes: [],
              required: true,
              include: {
                model: Region,
                attributes: [],
                required: true,
                where: { id: region },
              },
            },
            attributes: [],
            required: true,
          },
          {
            model: YearMonth,
            attributes: [],
            required: true,
            include: {
              model: Year,
              attributes: [],
              required: true,
            },
          },
        ],
        order: [['trans_total', 'desc']],
        limit: 1,
      });

      return res.json(transationsMonth[0]);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ['Search error'],
      });
    }
  }
}

export default new TransationController();
