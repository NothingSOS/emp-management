import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Form, Grid, Checkbox, Button } from 'semantic-ui-react';

const TakeExamAgreement = ({ isAgree, onClickCheckbox, id, onClickAgree, testdate }) => (
  <div>
    <br />
    <Segment.Group>
      <Segment>
        <h1>Terms and Conditions.</h1>
        {/* this just a temp paragraph,
            replace it with exam-rule and agreement */}
        <Segment>
          <p>Well you only need the light when it`s burning low</p>
          <p>Only miss the sun when it starts to snow</p>
          <p>Only know you love her when you let her go</p>
          <p>Only know you`ve been high when you`re feeling low</p>
          <p>Only hate the road when you`re missing home</p>
          <p>Only know you love her when you let her go</p>
          <p>And you let her go</p>
        </Segment>
      </Segment>
      <Segment>
        <Form>
          <Grid>
            <Grid.Column width={14}>
              <Checkbox
                label=" I agree to the Terms and Conditions."
                value={!isAgree}
                checked={isAgree}
                onClick={(e, { value }) => onClickCheckbox(value)}
              />
            </Grid.Column>
            <Grid.Column width={2}>
              <Button
                primary
                disabled={!isAgree}
                onClick={() => onClickAgree(id, testdate)}
              >
                Accept
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      </Segment>
    </Segment.Group>
  </div>
);

TakeExamAgreement.propTypes = {
  isAgree: PropTypes.bool.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  onClickAgree: PropTypes.func.isRequired,
  testdate: PropTypes.string.isRequired,
};

export default TakeExamAgreement;
