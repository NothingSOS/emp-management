const db = require('../db');

const AccessControl = {};

AccessControl.create = (accessControl, id) => (
  db.one(
    `INSERT INTO access_control 
    (
      name, 
      timesheet_add_own, 
      timesheet_add_other, 
      timesheet_edit_own, 
      timesheet_edit_other, 
      timesheet_view_own, 
      timesheet_view_other, 
      timesheet_delete_own, 
      timesheet_delete_other,
      leave_add_own,
      leave_add_other,
      leave_view_own,
      leave_view_other,
      leave_cancel_own,
      leave_cancel_other,
      leave_approve,
      project_add,
      project_edit,
      project_view_own,
      project_view_all,
      profile_edit_own,
      profile_edit_all,
      profile_view_info,
      report_timesheet_own,
      report_timesheet_other,
      profile_view_all,
      user_create,
      created_user,
      updated_user
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)`,
    [
      accessControl.name,
      accessControl.timesheetAddOwn,
      accessControl.timesheetAddOther,
      accessControl.timesheetEditOwn,
      accessControl.timesheetEditOther,
      accessControl.timesheetViewOwn,
      accessControl.timesheetViewOther,
      accessControl.timesheetDeleteOwn,
      accessControl.timesheetDeleteOther,
      accessControl.leaveAddOwn,
      accessControl.leaveAddOther,
      accessControl.leaveViewOwn,
      accessControl.leaveViewOther,
      accessControl.leaveCancelOwn,
      accessControl.leaveCancelOther,
      accessControl.leaveApprove,
      accessControl.projectAdd,
      accessControl.projectEdit,
      accessControl.projectViewOwn,
      accessControl.projectViewAll,
      accessControl.profileEditOwn,
      accessControl.profileEditAll,
      accessControl.profileViewInfo,
      accessControl.reportTimesheetOwn,
      accessControl.reportTimesheetOther,
      accessControl.profileViewAll,
      accessControl.userCreate,
      id,
      id
    ]
  )
);

AccessControl.findAll = () => (
  db.manyOrNone('SELECT * FROM access_control')
);

module.exports = AccessControl;
