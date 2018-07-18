import React, { Component } from 'react';
import ReactDrafts from 'react-drafts';
import { Header, Label } from 'semantic-ui-react';
import '../../node_modules/react-drafts/dist/react-drafts.css';

export default class ExamRichTextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = { isClear: false, alreadyFocus: false };

    this.onFocus = this.onFocus.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleSave = this.handleSave.bind(this);

    setInterval(this.handleSave, 500);
    setTimeout(() => { this.setState({ alreadyFocus: true }); }, 5000);
  }

  onFocus() {
    this.setState({ alreadyFocus: true });
  }

  handleSave() {
    this.setState({}, () => {
      this.editor.save().then((content) => {
        localStorage.setItem('examQuestion', content);

        setTimeout(() => { }, 300);
      });
    });
  }

  handleFileUpload(file) {
    return Promise.resolve({
      src: file.preview,
      name: file.name
    });
  }

  render() {
    const storedContent = this.props.quiz;
    if (!this.state.isClear) {
      localStorage.removeItem('examQuestion');
      this.setState({ isClear: true });
    }

    return (
      <div className="demo-editor">
        <Header as="h5">Question
          <label style={{ color: 'red' }}>*</label>
          {this.state.alreadyFocus && localStorage.getItem('examQuestion') === '<p></p>' &&
            <Label basic color="red" pointing="left" >Required</Label>}
        </Header>
        <div style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#e2e2e2', borderRadius: '5px' }}>
          <ReactDrafts
            ref={(editor) => { this.editor = editor; }}
            content={storedContent}
            onFileUpload={this.handleFileUpload}
            allowPhotoLink={false}
            allowPhotoSizeAdjust={false}
            linkInputAcceptsFiles={false}
            spellcheckEnabled={false}
            onFocus={this.onFocus}
            customControls={['bold', 'italic', 'underline', 'quotes', 'bulletList', 'orderedList', 'alignLeft', 'alignCenter', 'alignRight', 'table', 'photo']}
            exportTo="html"
          />
        </div>
        <br />
      </div>
    );
  }
}
