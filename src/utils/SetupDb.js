import axios from 'axios';

import Region from '../models/Region';
import State from '../models/State';
import City from '../models/City';
import Year from '../models/Year';
import YearMonth from '../models/YearMonth';
import Transaction from '../models/Transaction';

class SetupDb {
  async setupRegions() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

    try {
      const { data } = await axios.get(`https://olinda.bcb.gov.br/olinda/servico/Pix_DadosAbertos/versao/v1/odata/TransacoesPixPorMunicipio(DataBase=@DataBase)?@DataBase=%27${currentYear}${currentMonth}%27&$top=100&$orderby=QT_PagadorPF%20desc&$format=json&$select=AnoMes,Sigla_Regiao,Regiao`);
      const regionsToCreate = [];
      const regionCodes = [];
      data.value.forEach((content) => {
        if (!regionCodes.includes(content.Sigla_Regiao)) {
          regionCodes.push(content.Sigla_Regiao);
          regionsToCreate.push({
            acronym: content.Sigla_Regiao,
            name: content.Regiao,
          });
        }
      });
      const createdRegions = await Region.bulkCreate(regionsToCreate);
      console.log(createdRegions);
    } catch (e) {
      console.log(e);
    }
  }

  async setupStates() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

    try {
      const { data } = await axios.get(`https://olinda.bcb.gov.br/olinda/servico/Pix_DadosAbertos/versao/v1/odata/TransacoesPixPorMunicipio(DataBase=@DataBase)?@DataBase=%27${currentYear}${currentMonth}%27&$top=100&$orderby=QT_PagadorPF%20desc&$format=json&$select=AnoMes,Estado_Ibge,Estado,Sigla_Regiao,Regiao`);

      const regions = await Region.findAll();
      const statesToCreate = [];
      const stateCodes = [];
      data.value.forEach((content) => {
        if (!stateCodes.includes(content.Estado_Ibge)) {
          let regionId;
          for (let j = 0; j < regions.length; j++) {
            if (regions[j].acronym === content.Sigla_Regiao) {
              regionId = regions[j].id;
              break;
            }
          }
          if (regionId) {
            stateCodes.push(content.Estado_Ibge);
            statesToCreate.push({
              ibge_code: content.Estado_Ibge,
              name: content.Estado,
              region: regionId,
            });
          }
        }
      });
      const createdStates = await State.bulkCreate(statesToCreate);
      console.log(createdStates);
    } catch (e) {
      console.log(e);
    }
  }

  async setupCities(state, max) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

    try {
      const { data } = await axios.get(`https://olinda.bcb.gov.br/olinda/servico/Pix_DadosAbertos/versao/v1/odata/TransacoesPixPorMunicipio(DataBase=@DataBase)?@DataBase='${currentYear}${currentMonth}'&$top=${max ?? '10'}&$filter=Estado%20eq%20'${state.name}'&$orderby=QT_PagadorPF%20desc&$format=json&$select=AnoMes,Municipio_Ibge,Municipio,Estado_Ibge,Estado,Sigla_Regiao,Regiao,QT_PagadorPF`);

      const citiesToCreate = [];
      const cityCodes = [];
      data.value.forEach((content) => {
        if (!cityCodes.includes(content.Municipio_Ibge)) {
          cityCodes.push(content.Municipio_Ibge);
          citiesToCreate.push({
            ibge_code: content.Municipio_Ibge,
            name: content.Municipio,
            state: state.id,
          });
        }
      });
      const createdCities = await City.bulkCreate(citiesToCreate);
      console.log(createdCities);
    } catch (e) {
      console.log(e);
    }
  }

  async setupYearMonths(year) {
    const months = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    };
    try {
      const yearCreated = await Year.create({
        year,
      });
      const monthsToCreate = [];
      Object.keys(months).forEach((monthKey) => {
        monthsToCreate.push({
          month_num: monthKey,
          month: months[monthKey],
          year: yearCreated.id,
        });
      });
      const yearMonths = await YearMonth.bulkCreate(monthsToCreate);
      console.log(yearMonths);
    } catch (e) {
      console.log(e);
    }
  }

  async setupTransactions(startDate) {
    try {
      const { data: allData } = await axios.get(`https://olinda.bcb.gov.br/olinda/servico/Pix_DadosAbertos/versao/v1/odata/TransacoesPixPorMunicipio(DataBase=@DataBase)?@DataBase=%27${startDate}%27&$format=json&$select=AnoMes,Municipio_Ibge,Municipio,Estado_Ibge,Estado,Sigla_Regiao,Regiao,VL_PagadorPF,QT_PagadorPF,VL_PagadorPJ,QT_PagadorPJ,VL_RecebedorPF,QT_RecebedorPF,VL_RecebedorPJ,QT_RecebedorPJ`);
      console.log(allData);

      const yearMonths = await YearMonth.findAll({ include: Year });

      const cities = await City.findAll();

      const transactionsToCreate = [];
      allData.value.forEach((data) => {
        let citieId;
        for (let j = 0; j < cities.length; j++) {
          if (cities[j].ibge_code === data.Municipio_Ibge) {
            citieId = cities[j].id;
            break;
          }
        }
        let yearMonthId;
        for (let i = 0; i < yearMonths.length; i++) {
          const yearMonthString = `${yearMonths[i].Year.year}${String(yearMonths[i].month_num).padStart(2, '0')}`;
          if (yearMonthString === String(data.AnoMes)) {
            yearMonthId = yearMonths[i].id;
            break;
          }
        }
        if (citieId && yearMonthId) {
          transactionsToCreate.push({
            vl_individual_payer: data.VL_PagadorPF,
            qt_individual_payer: data.QT_PagadorPF,
            vl_company_payer: data.VL_PagadorPJ,
            qt_company_payer: data.QT_PagadorPJ,
            vl_individual_receiver: data.VL_RecebedorPF,
            qt_individual_receiver: data.QT_RecebedorPF,
            vl_company_receiver: data.VL_RecebedorPJ,
            qt_company_receiver: data.QT_RecebedorPJ,
            city: citieId,
            year_month: yearMonthId,
          });
        }
      });

      const createdTransactions = await Transaction.bulkCreate(transactionsToCreate);
      console.log(createdTransactions);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new SetupDb();
