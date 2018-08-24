/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, reset } from 'redux-form';
import { Button, Segment, Table, Modal, Input, Label, Dropdown, Icon } from 'semantic-ui-react';
import NumberFormat from 'react-number-format';

import PreviewErpDetail from '../containers/modals/PreviewErpDetail';
import AddRow from '../containers/forms/Addrow';

const imgreader = (imgFile) => {
  const localImageUrl = window.URL.createObjectURL(imgFile);
  return localImageUrl;
};

const selector = [
  { key: '1', value: '1', text: 'ใบขออนุมัติเบิกค่าใช้จ่าย' },
  { key: '2', value: '2', text: 'ใบขออนุมัติเบิกเงินทดรองจ่าย' },
  { key: '3', value: '3', text: 'ใบเคลียร์เงินทดรองจ่าย' },
  { key: '4', value: '4', text: 'ใบขอเบิกค่าพาหนะ / อื่นๆ' }
];

const table = (arraddrow, addrow, handleSubmit, handleDeleteRow) => {
  switch (arraddrow[0][0].data) {
    case '1':
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
            {addrow.map((i, index) => (
              <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{i.field_1}</Table.Cell>
                <Table.Cell>{i.field_2}</Table.Cell>
                <Table.Cell>{i.field_3}</Table.Cell>
                <Table.Cell textAlign="right" > <NumberFormat value={i.field_4} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale /> </Table.Cell>
                <Table.Cell> <Icon name="delete" color="red" onClick={() => handleDeleteRow(index)} /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <AddRow arraddrow={arraddrow} onSubmit={handleSubmit} />
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Footer>
        </Table>
      );
    case '2':
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
            {addrow.map((i, index) => (
              <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{i.field_1}</Table.Cell>
                <Table.Cell>{i.field_2}</Table.Cell>
                <Table.Cell>{i.field_3}</Table.Cell>
                <Table.Cell textAlign="right"> <NumberFormat value={i.field_4} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale /> </Table.Cell>
                <Table.Cell> <Icon name="delete" color="red" onClick={() => handleDeleteRow(index)} /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <AddRow arraddrow={arraddrow} onSubmit={handleSubmit} />
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Footer>
        </Table>
      );
    case '3':
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
            {addrow.map((i, index) => (
              <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{i.field_1}</Table.Cell>
                <Table.Cell>{i.field_2}</Table.Cell>
                <Table.Cell>{i.field_3}</Table.Cell>
                <Table.Cell textAlign="right" > <NumberFormat value={i.field_4} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale /> </Table.Cell>
                <Table.Cell> <Icon name="delete" color="red" onClick={() => handleDeleteRow(index)} /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4">
              <AddRow arraddrow={arraddrow} onSubmit={handleSubmit} />
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Footer>
        </Table>
      );
    case '4':
      return (
        <Table celled fixed >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1} />
              <Table.HeaderCell width={3} >ว / ด / ป</Table.HeaderCell>
              <Table.HeaderCell width={3} >กรณีวันหยุดให้ระบุวันด้วย</Table.HeaderCell>
              <Table.HeaderCell width={3} >รายการ</Table.HeaderCell>
              <Table.HeaderCell width={3} >จำนวนเงิน</Table.HeaderCell>
              <Table.HeaderCell width={3} >หมายเหตุ</Table.HeaderCell>
              <Table.HeaderCell width={1} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {addrow.map((i, index) => (
              <Table.Row>
                <Table.Cell width={1} />
                <Table.Cell>{i.field_1}</Table.Cell>
                <Table.Cell>{i.field_2}</Table.Cell>
                <Table.Cell>{i.field_3}</Table.Cell>
                <Table.Cell textAlign="right" > <NumberFormat value={i.field_4} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale /> </Table.Cell>
                <Table.Cell>{i.field_5}</Table.Cell>
                <Table.Cell> <Icon name="delete" color="red" onClick={() => handleDeleteRow(index)} /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.HeaderCell width={1} />
            <Table.HeaderCell colSpan="5">
              <AddRow arraddrow={arraddrow} onSubmit={handleSubmit} />
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Footer>
        </Table>
      );
    default:
      return (
        <div>
          defalut erp add
        </div>
      );
  }
};

const ErpAdd = ({ addrow, arraddrow, img, handleDropdown, handleSubmit, handleDeleteRow, handleCreate, handlerFileChanged, handleDeleteUpload }) => (
  <div>
    <br />
    <Segment.Group raised>
      <Segment>
        <Dropdown placeholder="ชนิดของบิล" defaultValue="1" fluid selection options={selector} onChange={(event, { value }) => handleDropdown('key', value)} />
      </Segment>

      <Segment>
        {table(arraddrow, addrow, handleSubmit, handleDeleteRow)}

        <Segment>
          <Button > <label htmlFor="file-upload" > Upload File </label> </Button>
          <Input type="file" id="file-upload" style={{ display: 'none' }} accept=".jpg, .png, .gif, .jpeg" onChange={((e) => { e.target.files.length > 0 && handlerFileChanged({ files: e.target.files }); })} />
          <br />
          <br />
          {img.map((image, index) => (
            <div>
              <Label> {image.files[0].name} </Label>
              <a href={imgreader(image.files[0])} target="_blank" rel="noopener noreferrer" > <Icon name="eye" color="black" /> </a>
              <Icon name="delete" color="red" onClick={() => handleDeleteUpload(index)} />
            </div>
          ))}
        </Segment>

        <Modal trigger={<Button>Preview</Button>} >
          <PreviewErpDetail arraddrow={arraddrow} />
        </Modal>
        {addrow.length > 0 ?
          <Button onClick={() => { handleCreate(arraddrow); document.getElementById('createButton').disabled = true; }} floated="right" color="green" id="createButton" disabled={false}>Create</Button> :
          <Button floated="right" color="green" disabled>Create</Button>
        }
      </Segment>
    </Segment.Group>
    <br />
    <br />
    <br />
  </div>
);

ErpAdd.propTypes = {
  addrow: PropTypes.array.isRequired,
  arraddrow: PropTypes.array.isRequired,
  img: PropTypes.array.isRequired,
  handleDropdown: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
  handleDeleteUpload: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  handlerFileChanged: PropTypes.func.isRequired,
};

const afterSubmit = (result, dispatch) =>
  dispatch(reset('RowInsert'));

const enhance = compose(
  connect(null, null),
  reduxForm({
    form: 'RowInsert',
    onSubmitSuccess: afterSubmit,
    destroyOnUnmount: false
  })
);
export default enhance(ErpAdd);
