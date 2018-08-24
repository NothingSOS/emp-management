// /* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Segment, Input, Label, Icon } from 'semantic-ui-react';
// import { compose } from 'recompose';
// import { connect } from 'react-redux';
// import { Field, reduxForm, reset } from 'redux-form';
// import * as validator from '../utils/validator';
import AddRowDetail from '../containers/forms/Addrowdetail';

const imgreader = (imgFile) => {
  const localImageUrl = window.URL.createObjectURL(imgFile);
  return localImageUrl;
};

const headerBill = ['ใบขออนุมัติเบิกค่าใช้จ่าย', 'ใบขออนุมัติเบิกเงินทดรองจ่าย', 'ใบเคลียร์เงินทดรองจ่าย', 'ใบขอเบิกค่าพาหนะ / อื่นๆ'];

const table = (erpdetail, selector, deleteRow, handleSubmit) => {
  switch (selector) {
    case 1:
      return (
        <Table celled fixed>
          <Table.Header>
            <Table.Row >
              <Table.HeaderCell width={2} >Item</Table.HeaderCell>
              <Table.HeaderCell width={5} >Suppliers/Customers</Table.HeaderCell>
              <Table.HeaderCell width={5} >Description</Table.HeaderCell>
              <Table.HeaderCell width={5} >Project No.</Table.HeaderCell>
              <Table.HeaderCell width={5} >Amount (Baht)</Table.HeaderCell>
              <Table.HeaderCell width={2} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {erpdetail.lists.map((data, index) => (
              <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{data.field1}</Table.Cell>
                <Table.Cell>{data.field2}</Table.Cell>
                <Table.Cell>{data.field3}</Table.Cell>
                <Table.Cell>{data.field4}</Table.Cell>
                <Table.Cell> <Icon name="delete" color="red" onClick={() => deleteRow(index)} /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <AddRowDetail onSubmit={handleSubmit} num={selector} />
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Footer>
        </Table>
      );
    case 2:
      return (
        <Table celled fixed >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2} >Item</Table.HeaderCell>
              <Table.HeaderCell width={5} >ช่วงเวลาใช้เงิน Advance</Table.HeaderCell>
              <Table.HeaderCell width={5} >กำหนดเคลียร์คืน</Table.HeaderCell>
              <Table.HeaderCell width={5} >Description</Table.HeaderCell>
              <Table.HeaderCell width={5} >Amount (Baht)</Table.HeaderCell>
              <Table.HeaderCell width={2} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {erpdetail.lists.map((data, index) => (
              <Table.Row >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{data.field1}</Table.Cell>
                <Table.Cell>{data.field2}</Table.Cell>
                <Table.Cell>{data.field3}</Table.Cell>
                <Table.Cell>{data.field4}</Table.Cell>
                <Table.Cell> <Icon name="delete" color="red" onClick={() => deleteRow(index)} /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <AddRowDetail onSubmit={handleSubmit} num={selector} />
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Footer>
        </Table>
      );
    case 3:
      return (
        <Table celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2} >Item</Table.HeaderCell>
              <Table.HeaderCell width={5} >ช่วงเวลาใช้เงิน Advance</Table.HeaderCell>
              <Table.HeaderCell width={5} >กำหนดเคลียร์คืน</Table.HeaderCell>
              <Table.HeaderCell width={5} >Description</Table.HeaderCell>
              <Table.HeaderCell width={5} >Amount (Baht)</Table.HeaderCell>
              <Table.HeaderCell width={2} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {erpdetail.lists.map((data, index) => (
              <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{data.field1}</Table.Cell>
                <Table.Cell>{data.field2}</Table.Cell>
                <Table.Cell>{data.field3}</Table.Cell>
                <Table.Cell>{data.field4}</Table.Cell>
                <Table.Cell> <Icon name="delete" color="red" onClick={() => deleteRow(index)} /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <AddRowDetail onSubmit={handleSubmit} num={selector} />
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Footer>
        </Table>
      );
    case 4:
      return (
        <Table celled fixed >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3} >ว / ด / ป</Table.HeaderCell>
              <Table.HeaderCell width={3} >กรณีวันหยุดให้ระบุวันด้วย</Table.HeaderCell>
              <Table.HeaderCell width={3} >รายการ</Table.HeaderCell>
              <Table.HeaderCell width={3} >จำนวนเงิน</Table.HeaderCell>
              <Table.HeaderCell width={3} >หมายเหตุ</Table.HeaderCell>
              <Table.HeaderCell width={1} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {erpdetail.lists.map((data, index) => (
              <Table.Row >
                <Table.Cell>{data.field1}</Table.Cell>
                <Table.Cell>{data.field2}</Table.Cell>
                <Table.Cell>{data.field3}</Table.Cell>
                <Table.Cell>{data.field4}</Table.Cell>
                <Table.Cell>{data.field5}</Table.Cell>
                <Table.Cell> <Icon name="delete" color="red" onClick={() => deleteRow(index)} /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.HeaderCell colSpan="5">
              <AddRowDetail onSubmit={handleSubmit} num={selector} />
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Footer>
        </Table>
      );
    default:
      return (
        <div>
          defalut edit table
        </div>
      );
  }
};

const Detailerp = ({ erpdetail, deleteRow, handleSubmit, createErpDetail, handleDeleteImage, handleImageChange, handleDeleteImageUpdate }) => {
  const selector = erpdetail.type;
  return (
    <div>
      <Label content={headerBill[selector - 1]} size="massive" />
      <Segment raised>
        {table(erpdetail, selector, deleteRow, handleSubmit)}
        <Segment>
          <Button> <label htmlFor="file-upload" > Upload File </label> </Button>
          <Input type="file" onChange={e => handleImageChange({ files: e.target.files })} id="file-upload" style={{ display: 'none' }} />

          {erpdetail.img.map((img, index) => (
            <div>
              <Label> {img.filename} </Label>
              <a rel="noopener noreferrer" href={`localhost:3000/static/imgerp/${img.filename}`} target="_blank" > <Icon name="eye" color="black" /> </a>
              <Icon name="delete" color="red" onClick={() => handleDeleteImage(index)} />
            </div>
          ))}

          {erpdetail.imgupdate.map((imgupdate, index) => (
            <div>
              <Label>imgupdate.filename</Label>
              <a rel="noopener noreferrer" target="_blank" href={imgreader(imgupdate.files[0])} > <Icon name="eye" color="black" /> </a>
              <Icon name="delete" color="red" onClick={() => handleDeleteImageUpdate(index)} />
            </div>
          ))}
        </Segment>
        {erpdetail.lists.length > 0 ?
          <Button onClick={() => { createErpDetail(erpdetail); document.getElementById('saveButton').disabled = true; }} color="green" id="saveButton"disabled={false}> Save </Button> :
          <Button color="green" disabled> Save </Button>
        }
      </Segment>
    </div>
  );
};

Detailerp.propTypes = {
  erpdetail: PropTypes.array.isRequired,
  deleteRow: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDeleteImage: PropTypes.func.isRequired,
  handleDeleteImageUpdate: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  createErpDetail: PropTypes.func.isRequired,
};

// const enhance = compose(
//   connect(null, null),
//   reduxForm({
//     form: 'Detailerp',
//     validate,
//   })
// );

export default (Detailerp);
