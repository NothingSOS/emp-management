import { Modal, Header, Table, Segment } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';
import ThaiBaht from 'thai-baht-text';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';

const note = [
  'หมายเหตุ: กรุณานำส่งใบอนุมัติการขอเบิกเงินค่าพาหนะ / อื่นๆ ที่ผ่านการอนุมัติจากผู้บังคับบัญชาเรียบร้อยแล้วพร้อมทั้งเอกสารประกอบการเบิกเงินให้ครบถ้วนไปยังแผนกบัญชีจ่าย อย่างช้าไม่เกินวันที่ 7 ของเดือนถัดจากเดือนที่เกิดค่าพาหนะหรือเดือนระบุไว้ในใบเสร็จรับเงินที่ต้องการเบิกเงินค่าใช้จ่าย หากแผนกบัญชีจ่ายได้รับเอกสารการเบิกเงินล่าช้ากว่ากำหนดเวลาดังกล่าว บริษัทฯ ขอสงวนสิทธิในการจ่ายคืนค่าใช้จ่ายดังกล่าว',
  'หมายเหตุ: เงินทดรองจ่ายที่เบิกไปแล้วต้องนำมาเคลียร์เงินที่แผนกบัญชีจ่ายอย่างช้าที่สุดไม่เกิน 7 วันทำการหลังจากวันสุดท้ายของหมายกำหนดการใช้เงินทดรองจ่าย หากเกินกำหนดเวลาดังกล่าวบริษัทฯขอสงวนสิทธิ์ในการเคลียร์ค่าใช้จ่ายที่เกิดขึ้นให้กับพนักงานในอัตรา 70% ของค่าใช้จ่ายที่ไปจ่ายไปทั้งหมดเท่านั้น (โดยพนักงานต้องรับผิดชอบจ่ายเองในอัตรา 30%ตามอัตราภาษีที่บริษัทต้องเสีย)',
  'หมายเหตุ: เงินทดรองจ่ายที่เบิกไปแล้วต้องนำมาเคลียร์เงินที่แผนกบัญชีจ่ายอย่างช้าที่สุดไม่เกิน 7 วันทำการหลังจากวันสุดท้ายของหมายกำหนดการใช้เงินทดรองจ่าย หากเกินกำหนดเวลาดังกล่าวบริษัทฯขอสงวนสิทธิ์ในการเคลียร์ค่าใช้จ่ายที่เกิดขึ้นให้กับพนักงานในอัตรา 70% ของค่าใช้จ่ายที่ไปจ่ายไปทั้งหมดเท่านั้น (โดยพนักงานต้องรับผิดชอบจ่ายเองในอัตรา 30%ตามอัตราภาษีที่บริษัทต้องเสีย)',
  'หมายเหตุ: กรุณานำส่งใบอนุมัติการขอเบิกเงินค่าพาหนะ / อื่นๆ ที่ผ่านการอนุมัติจากผู้บังคับบัญชาเรียบร้อยแล้วพร้อมทั้งเอกสารประกอบการเบิกเงินให้ครบถ้วนไปยังแผนกบัญชีจ่าย อย่างช้าไม่เกินวันที่ 7 ของเดือนถัดจากเดือนที่เกิดค่าพาหนะหรือเดือนระบุไว้ในใบเสร็จรับเงินที่ต้องการเบิกเงินค่าใช้จ่าย หากแผนกบัญชีจ่ายได้รับเอกสารการเบิกเงินล่าช้ากว่ากำหนดเวลาดังกล่าว บริษัทฯ ขอสงวนสิทธิในการจ่ายคืนค่าใช้จ่ายดังกล่าว'
];

const headerContent = [
  'ใบขออนุมัติเบิกค่าใช้จ่าย',
  'ใบขออนุมัติเบิกเงินทดรองจ่าย',
  'ใบเคลียร์เงินทดรองจ่าย',
  'ใบขอเบิกค่าพาหนะ / อื่นๆ'
];

const table = (arraddrow, sum) => {
  switch (arraddrow[0][0].data) {
    case '1':
      return (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Item</Table.HeaderCell>
              <Table.HeaderCell>Suppliers/Customers</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Project No.</Table.HeaderCell>
              <Table.HeaderCell>Amount (Baht)</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {arraddrow[1].map((i, index) => (
              <Table.Row >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{i.field_1}</Table.Cell>
                <Table.Cell>{i.field_2}</Table.Cell>
                <Table.Cell>{i.field_3}</Table.Cell>
                <Table.Cell textAlign="right"> <NumberFormat value={i.field_4} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="2" />
              <Table.HeaderCell> รวมเงิน {' '} </Table.HeaderCell>
              <Table.HeaderCell> {ThaiBaht(sum)} </Table.HeaderCell>
              <Table.HeaderCell textAlign="right"> <NumberFormat value={sum} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale /> </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      );
    case '2':
      return (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Item</Table.HeaderCell>
              <Table.HeaderCell>ช่วงเวลาใช้เงิน Advance</Table.HeaderCell>
              <Table.HeaderCell>กำหนดเคลียร์คืน</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Amount (Baht)</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {arraddrow[1].map((i, index) => (
              <Table.Row >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{i.field_1}</Table.Cell>
                <Table.Cell>{i.field_2}</Table.Cell>
                <Table.Cell>{i.field_3}</Table.Cell>
                <Table.Cell textAlign="right"> <NumberFormat value={i.field_4} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="2" />
              <Table.HeaderCell> รวมเงิน {' '} </Table.HeaderCell>
              <Table.HeaderCell> {ThaiBaht(sum)} </Table.HeaderCell>
              <Table.HeaderCell textAlign="right"> <NumberFormat value={sum} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale /> </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      );
    case '3':
      return (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Item</Table.HeaderCell>
              <Table.HeaderCell>ช่วงเวลาใช้เงิน Advance</Table.HeaderCell>
              <Table.HeaderCell>กำหนดเคลียร์คืน</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Amount (Baht)</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {arraddrow[1].map((i, index) => (
              <Table.Row >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{i.field_1}</Table.Cell>
                <Table.Cell>{i.field_2}</Table.Cell>
                <Table.Cell>{i.field_3}</Table.Cell>
                <Table.Cell textAlign="right"> <NumberFormat value={i.field_4} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale /> </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="2" />
              <Table.HeaderCell> รวมเงิน {' '} </Table.HeaderCell>
              <Table.HeaderCell> {ThaiBaht(sum)} </Table.HeaderCell>
              <Table.HeaderCell textAlign="right"> <NumberFormat value={sum} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale /> </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      );
    case '4':
      return (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ว / ด / ป</Table.HeaderCell>
              <Table.HeaderCell>กรณีวันหยุดให้ระบุวันด้วย</Table.HeaderCell>
              <Table.HeaderCell>รายการ</Table.HeaderCell>
              <Table.HeaderCell>จำนวนเงิน</Table.HeaderCell>
              <Table.HeaderCell>หมายเหตุ</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {arraddrow[1].map(i => (
              <Table.Row >
                <Table.Cell>{i.field_1}</Table.Cell>
                <Table.Cell>{i.field_2}</Table.Cell>
                <Table.Cell>{i.field_3}</Table.Cell>
                <Table.Cell textAlign="right" > <NumberFormat value={i.field_4} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale /> </Table.Cell>
                <Table.Cell>{i.field_5}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell> รวมเงิน {' '} </Table.HeaderCell>
              <Table.HeaderCell> {ThaiBaht(sum)} </Table.HeaderCell>
              <Table.HeaderCell textAlign="right"> <NumberFormat value={sum} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale /> </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Footer>
        </Table>
      );
    default:
      return (
        <div>
          default table
        </div>
      );
  }
};

const PreviewErpDetail = ({ arraddrow }) => {
  switch (arraddrow[0][0].data) {
    case '1': {
      let sum = 0;
      arraddrow[1].forEach((element) => {
        sum += Number.parseFloat(element.field_4, 10);
      });
      return (
        <div>
          <Segment size="large">
            <Header icon="money" content={headerContent[arraddrow[0][0].data - 1]} />
            <Modal.Content>
              {table(arraddrow, sum)}
              <Segment>
                {note[arraddrow[0][0].data - 1]}
              </Segment>
            </Modal.Content>
          </Segment>
        </div>
      );
    }
    case '2': {
      let sum = 0;
      arraddrow[1].forEach((element) => {
        sum += Number.parseFloat(element.field_4, 10);
      });
      return (
        <div>
          <Segment size="large">
            <Header icon="money" content={headerContent[arraddrow[0][0].data - 1]} />
            <Modal.Content>
              {table(arraddrow, sum)}
              <Segment>
                {note[arraddrow[0][0].data - 1]}
              </Segment>
            </Modal.Content>
          </Segment>
        </div>
      );
    }
    case '3': {
      let sum = 0;
      arraddrow[1].forEach((element) => {
        sum += Number.parseFloat(element.field_4, 10);
      });
      return (
        <div>
          <Segment size="large">
            <Header icon="money" content={headerContent[arraddrow[0][0].data - 1]} />
            <Modal.Content>
              {table(arraddrow, sum)}
              <Segment>
                {note[arraddrow[0][0].data - 1]}
              </Segment>
            </Modal.Content>
          </Segment>
        </div>
      );
    }
    case '4': {
      let sum = 0;
      arraddrow[1].forEach((element) => {
        sum += Number.parseFloat(element.field_4, 10);
      });
      return (
        <div>
          <Segment size="large">
            <Header icon="money" content={headerContent[arraddrow[0][0].data - 1]} />
            <Modal.Content>
              {table(arraddrow, sum)}
              <Segment>
                {note[arraddrow[0][0].data - 1]}
              </Segment>
            </Modal.Content>
          </Segment>
        </div>
      );
    }
    default:
      return (
        <div>
          default PreviewErpDetail
        </div>
      );
  }
};

PreviewErpDetail.propTypes = {
  arraddrow: PropTypes.array.isRequired
};

// const mapStateToProps = state => ({
//   modalName: state.modal.name,
//   submitting: isSubmitting('createErpRequest')(state),
//   test: [...state.erp]
// });

// const mapDispatchToProps = dispatch => ({
//   onClose: () => dispatch(closeModal()),
//   onSubmit: values => handleReduxFormSubmit(dispatch, addErpRequest, values, 'addErpRequest'),
//   onClick: () => dispatch(submit('addErpRequest'))
// });

export default connect(null, null)(PreviewErpDetail);
