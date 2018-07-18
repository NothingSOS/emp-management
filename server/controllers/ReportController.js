const Timesheet = require('../models/Timesheet');
const HasProject = require('../models/HasProject');
const Project = require('../models/Project');
const Excel = require('exceljs');


exports.createReport = (req, res, next) => {
  const excelType = req.report;
  if (excelType.reportType === 'Timesheet (Normal)') {
    const workbook = new Excel.Workbook();
    const project = HasProject.findByProjectIdAndUserId(excelType.projectId, excelType.userId);
    Project.findById(excelType.projectId)
      .then((project) => {

      });
    workbook.xlsx.readFile('server/storage/report/Playtorium_Timesheet_Normal_ver4.xlsx')
      .then(() => {
        const worksheet = workbook.getWorksheet('Timesheet');
        worksheet.getCell('B2').value = `${excelType.firstName} + " " + ${excelType.lastName}`;
        worksheet.getCell('E2').value = excelType.userId;
      });
  }
  const workbook = new Excel.Workbook();
  workbook.xlsx.readFile('server/storage/report/excel.xlsx')
    .then(() => {
      const worksheet = workbook.getWorksheet('Sheet1');
      worksheet.getCell('A1').value = '12345';
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      workbook.xlsx.writeFile(res);
    })
    .catch(next);
};
