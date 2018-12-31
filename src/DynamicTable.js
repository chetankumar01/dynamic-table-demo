import React from 'react';
import { Table, Row, Col, Popover, PopoverBody } from 'reactstrap';
import { MdMoreVert } from 'react-icons/md';
import { connect } from 'react-redux';
import { TableActions } from './actions';
import UploadXLSXWizard from './UploadXLSXWizard';

class DynamicTable extends React.PureComponent {
  state = {
    showPopover: false,
  };
  togglePopover = () => this.setState({ showPopover: !this.state.showPopover });

  applyPreview = index => {
    this.props.applyPreview(index);
    this.togglePopover();
  };

  render() {
    const { table, index } = this.props;
    const { data, preview, showPreview } = table;
    const dataToShow = showPreview ? preview : data;
    const { columns, rows } = dataToShow;
    return (
      <Row className="my-5">
        <Col xs="11">
          <Table bordered>
            <thead>
              <tr>
                {columns.map(c => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={String(index)}>
                  {columns.map(c => (
                    <td key={String(index) + c}>{row[c]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col xs="1">
          <button
            id={`moreTableOptions-${index}`}
            className="btn btn-sm float-right"
            onClick={this.togglePopover}
          >
            <MdMoreVert size="2em" />
          </button>
          {this.state.showPopover && (
            <Popover
              placement="bottom"
              isOpen={this.state.showPopover}
              target={`moreTableOptions-${index}`}
            >
              <PopoverBody>
                <div>
                  <UploadXLSXWizard
                    index={index}
                    showPreview={this.props.showPreview}
                    revertPreview={this.props.revertPreview}
                    applyPreview={this.applyPreview}
                    isPreviewMode={showPreview}
                  />
                </div>
              </PopoverBody>
            </Popover>
          )}
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  { ...TableActions },
)(DynamicTable);
