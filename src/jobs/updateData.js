import cron from 'node-cron';
import axios from 'axios';
import Year from '../models/Year';
import YearMonth from '../models/YearMonth';
import City from '../models/City';
import Transaction from '../models/Transaction';

function getYear(year) {
  return Year.findOne({
    where: { year },
  });
}

function createYear(year) {
  return Year.create({
    year,
  });
}

function getYearMonth(yearId, month) {
  return YearMonth.findOne({
    where: { month_num: month, year: yearId },
  });
}

function createYearMonth(yearId, monthNum) {
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
  return YearMonth.create({
    month_num: monthNum,
    month: (months[monthNum]).toUpperCase(),
    year: yearId,
  });
}

async function getData(yearMonth) {
  console.log('Getting data from the dataset');
  const { data } = await axios.get(`https://olinda.bcb.gov.br/olinda/servico/Pix_DadosAbertos/versao/v1/odata/TransacoesPixPorMunicipio(DataBase=@DataBase)?@DataBase=%27${yearMonth}%27&$format=json`);
  return data;
}

async function updateDB() {
  try {
    const currentDate = new Date();
    const [currentYear, currentMonth] = [currentDate.getFullYear(), currentDate.getMonth()];
    const currentYearMonth = `${currentYear}0${currentMonth}`;

    const { value: monthData } = await getData(currentYearMonth);
    console.log(monthData);

    let year = await getYear(currentYear);
    console.log(year);
    if (!year) {
      year = await createYear(currentYear);
    }

    let yearMonth = await getYearMonth(year.id, currentMonth);
    console.log(yearMonth);
    if (!yearMonth) {
      yearMonth = await createYearMonth(year.id, currentMonth);
    }

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

cron.schedule('0 18 1 * *', () => {
  console.log(`Task "Update Data" is running at ${new Date()}`);
  updateDB();
});
