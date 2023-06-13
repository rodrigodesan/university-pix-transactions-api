const dotenv = require('dotenv');

dotenv.config();

require('./database');

const Region = require('./models/Region');
const State = require('./models/State');
const City = require('./models/City');
const Year = require('./models/Year');
const YearMonth = require('./models/YearMonth');
const Transation = require('./models/Transation');


const fs = require("fs");
const rawData = fs.readFileSync('./resources/TransacoesPixPorMunicípio.json');
const transations = JSON.parse(rawData);
const transationsValues = transations.value;

/*
let selectedYearMonths = [];
const transationsFilterYM = transationsValues.filter((tran) => {
  const isSelected = selectedYearMonths.includes(tran.AnoMes);
  selectedYearMonths.push(tran.AnoMes);
  return !isSelected;
});

console.log(transationsFilterYM.length);

const months = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}
*/


async function submit() {
  for(let i = 0; i < transationsValues.length; i ++) {
    console.log("Index: ", i);
    try {
      //const thisItem = await City.findOne({where: {ibge_code: transationsValues[i].Municipio_Ibge}});
      //if(thisItem === null) {
        const thisYearMonth = String(transationsValues[i].AnoMes);
        const [thisYear, thisMonth] = [thisYearMonth.substring(0,4),thisYearMonth.substring(4,6)]
        const year = await Year.findOne({where: {year: Number(thisYear)}})
        const year_month = await YearMonth.findOne({where: {
          month_num: Number(thisMonth),
          year: year.id,
        }});

        const city = await City.findOne({where: {ibge_code: transationsValues[i].Municipio_Ibge}})

        const transation = await Transation.create({
          vl_individual_payer: transationsValues[i].VL_PagadorPF,
          qt_individual_payer: transationsValues[i].QT_PagadorPF,
          vl_company_payer: transationsValues[i].VL_PagadorPJ,
          qt_company_payer: transationsValues[i].QT_PagadorPJ,
          vl_individual_receiver: transationsValues[i].VL_RecebedorPF,
          qt_individual_receiver: transationsValues[i].QT_RecebedorPF,
          vl_company_receiver: transationsValues[i].VL_RecebedorPJ,
          qt_company_receiver: transationsValues[i].QT_RecebedorPJ,
          city: city.id,
          year_month: year_month.id,
        })
        console.log(transation);
      //} else {
       // console.log("Estado já cadastrada");
      //}
    } catch(e) {
      console.log(e);
    }
  }
}

submit().then(() => {
  console.log("finished")
})






