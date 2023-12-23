import cron from 'node-cron';
import axios from 'axios';
import Year from '../models/Year';
import YearMonth from '../models/YearMonth';
import City from '../models/City';
import Transaction from '../models/Transaction';

async function getOrCreateYear(year) {
  const thisYear = await Year.findOrCreate({
    where: { year },
    defaults: { year },
  });
  return thisYear[0];
}

async function getOrCreateYearMonth(year, month_num) {
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
  const yearMonths = await YearMonth.findOrCreate({
    where: { month_num, year },
    defaults: {
      month_num,
      month: (months[month_num]).toUpperCase(),
      year,
    },
  });

  return yearMonths[0];
}

async function getData(yearMonth) {
  console.log('Getting data from the dataset');
  const { data } = await axios.get(`https://olinda.bcb.gov.br/olinda/servico/Pix_DadosAbertos/versao/v1/odata/TransacoesPixPorMunicipio(DataBase=@DataBase)?@DataBase=%27${yearMonth}%27&$format=json`);
  return data;
}

/* async function addData() {
  const data = await getData('11/2023');
  console.log(data);
}

addData(); */

async function updateDB() {
  try {
    const currentDate = new Date();
    const [currentYear, currentMonth] = [currentDate.getFullYear(), currentDate.getMonth()];
    const currentYearMonth = `${currentYear}0${currentMonth}`;

    const { value: monthData } = await getData(currentYearMonth);
    console.log(monthData);

    const year = await getOrCreateYear(currentYear);
    console.log(year);
    console.log(year.id);

    const yearMonth = await getOrCreateYearMonth(year.id, currentMonth);
    console.log(yearMonth);

    const cities = await City.findAll();

    const transactionsToCreate = [];
    monthData.forEach((data) => {
      if (String(data.AnoMes) === currentYearMonth) {
        let citieId;
        for (let j = 0; j < cities.length; j++) {
          if (cities[j].ibge_code === data.Municipio_Ibge) {
            citieId = cities[j].id;
            break;
          }
        }
        if (citieId) {
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
            year_month: yearMonth.id,
          });
        }
      }
    });

    const createdTransactions = await Transaction.bulkCreate(transactionsToCreate);
    console.log(createdTransactions);
  } catch (err) {
    console.log(err);
  }
}
/*
cron.schedule('0 18 1 * *', () => {
  console.log(`Task "Update DataBase" is running at ${new Date()}`);
  updateDB();
});
*/
