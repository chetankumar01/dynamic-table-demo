import React from 'react';
import { Button, Table } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import XLSX from 'xlsx';

class UploadXLSXWizard extends React.PureComponent {
  state = {
    workbook: null,
    sheetJson: null,
    columns: null,
    step: 1,
  };

  parseExcel = e => {
    const rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
    const files = e.target.files,
      f = files[0];
    const reader = new FileReader();
    reader.onload = e => {
      let data = e.target.result;
      if (!rABS) data = new Uint8Array(data);
      const workbook = XLSX.read(data, {
        type: rABS ? 'binary' : 'array',
      });
      this.setState({ workbook });
      /* DO SOMETHING WITH workbook HERE */
    };
    if (rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
  };

  onSubmit = values => {
    const sheetJson = XLSX.utils.sheet_to_json(
      this.state.workbook.Sheets.Sheet1,
    );
    const columns = Object.keys(sheetJson[0]);
    this.setState({ step: 2, sheetJson, columns });
  };

  showPreview = () => {
    this.props.showPreview({
      index: this.props.index,
      columns: this.state.columns,
      rows: this.state.sheetJson,
    });
  };

  revertPreview = () => {
    this.props.revertPreview({
      index: this.props.index,
    });
  };

  applyPreview = () => {
    this.props.applyPreview({
      index: this.props.index,
    });
  };

  render() {
    const { step, workbook, sheetJson, columns } = this.state;
    console.log({ workbook, sheetJson, columns });
    return (
      <React.Fragment>
        {step === 1 && (
          <Formik
            initialValues={{
              file: '',
            }}
            onSubmit={this.onSubmit}
            render={({ setFieldValue }) => (
              <Form>
                <div className="my-4">
                  <label>Select an xlsx file</label>
                  <Field
                    type="file"
                    name="file"
                    onChange={e => {
                      this.parseExcel(e);
                      setFieldValue('file', e.target.value);
                    }}
                  />
                </div>
                <Button className="my-2 float-right" type="submit">
                  Next
                </Button>
              </Form>
            )}
          />
        )}
        {step === 2 && (
          <React.Fragment>
            <Table bordered>
              <thead>
                <tr>
                  <th>Column Name</th>
                </tr>
              </thead>
              <tbody>
                {columns.map(c => (
                  <tr key={c}>
                    <td>{c}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="py-2 clearfix">
              {!this.props.isPreviewMode ? (
                <Button className="float-right" onClick={this.showPreview}>
                  Preview
                </Button>
              ) : (
                <span className="float-right">
                  <Button className="float-right mx-2" onClick={this.applyPreview}>
                    Apply
                  </Button>
                  <Button
                    className="float-right mx-2"
                    onClick={this.revertPreview}
                  >
                    Revert
                  </Button>
                </span>
              )}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default UploadXLSXWizard;
