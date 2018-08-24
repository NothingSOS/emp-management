const xlsxoutput = require('../models/BillXLSXControl');
var Excel = require('exceljs');

exports.attachmentXLSX = (req, res, next) => {
  var rec_id = req.query.id;
  var userid = req.user.id;
  var output_bill = xlsxoutput.findAll(rec_id)
  var output_data = xlsxoutput.findBillData(rec_id)
  var output_user = xlsxoutput.findUser(userid)
  Promise.all([output_bill, output_data, output_user])
    .then(output => {
      console.log(output[0]);
      var headbill = output[0];
      var billdata = output[1];
      var user = output[2];
      var usernameTH = user.firstNameTh + '  ' + user.lastNameTh;
      var userPosition = user.name;
      var userId = user.userId;
      var dateOfSheet = headbill.createdDate;
      var typeOfSheet = parseInt(headbill.typeId);
      var op = '';
      var workbook = new Excel.Workbook();
      var column = ['A', 'C', 'E', 'G', 'H']

      switch (typeOfSheet) {
        case 1:
          var fileName = "server/storage/private/xlsx/BOOK1.xlsx";
          workbook.xlsx.readFile(fileName)
            .then(() => {
              var worksheet = workbook.getWorksheet("BOOK");
              var SHEETINDEX = 9;
              worksheet.getCell('C6').value = usernameTH;
              worksheet.getCell('F6').value = userPosition;
              worksheet.getCell('H6').value = userId;
              worksheet.getCell('H5').value = dateOfSheet;

              for (var i = 0; i < billdata.length; i++) {

                worksheet.getCell(column[0] + '' + (i + SHEETINDEX)).value = i + 1;
                worksheet.getCell(column[1] + '' + (i + SHEETINDEX)).value = billdata[i].field1;
                worksheet.getCell(column[2] + '' + (i + SHEETINDEX)).value = billdata[i].field2;
                worksheet.getCell(column[3] + '' + (i + SHEETINDEX)).value = billdata[i].field3;
                worksheet.getCell(column[4] + '' + (i + SHEETINDEX)).value = parseInt(billdata[i].field4);
              }
              res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
              workbook.xlsx.write(res);
            })
            .catch(next);
          break;
        case 2:
          var fileName = "server/storage/private/xlsx/BOOK2.xlsx";
          workbook.xlsx.readFile(fileName)
            .then(() => {
              var worksheet = workbook.getWorksheet("BOOK");
              var SHEETINDEX = 10;
              worksheet.getCell('C7').value = usernameTH;
              worksheet.getCell('F7').value = userPosition;
              worksheet.getCell('H7').value = userId;
              worksheet.getCell('H6').value = dateOfSheet;

              for (var i = 0; i < billdata.length; i++) {

                worksheet.getCell(column[0] + '' + (i + SHEETINDEX)).value = i + 1;
                worksheet.getCell(column[1] + '' + (i + SHEETINDEX)).value = billdata[i].field1;
                worksheet.getCell(column[2] + '' + (i + SHEETINDEX)).value = billdata[i].field2;
                worksheet.getCell(column[3] + '' + (i + SHEETINDEX)).value = billdata[i].field3;
                worksheet.getCell(column[4] + '' + (i + SHEETINDEX)).value = parseInt(billdata[i].field4);
              }
              res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
              workbook.xlsx.write(res);
            })
            .catch(next);
          break;
        case 3:
          var fileName = "server/storage/private/xlsx/BOOK3.xlsx";
          workbook.xlsx.readFile(fileName)
            .then(() => {
              var worksheet = workbook.getWorksheet("BOOK");
              var SHEETINDEX = 10;
              worksheet.getCell('C7').value = usernameTH;
              worksheet.getCell('F7').value = userPosition;
              worksheet.getCell('H7').value = userId;
              worksheet.getCell('H6').value = dateOfSheet;

              for (var i = 0; i < billdata.length; i++) {

                worksheet.getCell(column[0] + '' + (i + SHEETINDEX)).value = i + 1;
                worksheet.getCell(column[1] + '' + (i + SHEETINDEX)).value = billdata[i].field1;
                worksheet.getCell(column[2] + '' + (i + SHEETINDEX)).value = billdata[i].field2;
                worksheet.getCell(column[3] + '' + (i + SHEETINDEX)).value = billdata[i].field3;
                worksheet.getCell(column[4] + '' + (i + SHEETINDEX)).value = parseInt(billdata[i].field4);
              }
              res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
              workbook.xlsx.write(res);
            })
            .catch(next);
          break;
        case 4:
          var fileName = "server/storage/private/xlsx/BOOK4.xlsx";
          workbook.xlsx.readFile(fileName)
            .then(() => {
              var worksheet = workbook.getWorksheet("BOOK");
              var SHEETINDEX = 11;
              worksheet.getCell('C7').value = usernameTH;
              worksheet.getCell('F7').value = userPosition;
              worksheet.getCell('H7').value = userId;
              worksheet.getCell('H6').value = dateOfSheet;

              for (var i = 0; i < billdata.length; i++) {

                worksheet.getCell(column[0] + '' + (i + SHEETINDEX)).value = billdata[i].field1;
                worksheet.getCell(column[1] + '' + (i + SHEETINDEX)).value = billdata[i].field2;
                worksheet.getCell(column[2] + '' + (i + SHEETINDEX)).value = billdata[i].field3;
                worksheet.getCell(column[3] + '' + (i + SHEETINDEX)).value = parseInt(billdata[i].field4);
                worksheet.getCell(column[4] + '' + (i + SHEETINDEX)).value = billdata[i].field5;
              }
              res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
              workbook.xlsx.write(res);
            })
            .catch(next);
          break;
        default:
          break;
      }

      //  res.end();
    })
    .catch(next);


  // var array = [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
  //     .then(function () {
  //   //   // edit worksheet
  //     console.log(worksheet.getCell("A1").value);

  //     for (var i = 9; i < array.length + 9; i += 1) {
  //       for (var j = 0; j < array[i - 9].length + 1; j += 1) {
  //         // console.log(array.length[i-9]);
  //         var column_h = column[j] + '' + i;
  //         console.log(column_h)
  //         console.log(worksheet.getCell(column_h).value);
  //         if (j == 0) {
  //           worksheet.getCell(column_h).value = i - 8;
  //         } else {
  //           worksheet.getCell(column_h).value = array[i - 9][j - 1];
  //         }
  //       }
  //     }
  //     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  //     workbook.xlsx.write(res);

  // })
  // .then(function () {
  //   // console.log('erer')

  //  }).catch(err=>{
  //      console.log(err);
  //    })
  // res.download(fileName);
}


//Finally creating XLSX file