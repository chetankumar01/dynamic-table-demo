import React from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'reactstrap';
import DynamicTable from './DynamicTable';
import { TableActions } from './actions';

class TableList extends React.PureComponent {
  render() {
    return (
      <Container>
        <h1 className="text-muted">
          Dynamic Table Demo
          <Button className="float-right mt-3" onClick={this.props.createTable}>
            New Table
          </Button>
        </h1>
        <hr />
        {this.props.tables.map((table, index) => (
          <DynamicTable key={String(index)} index={index} table={table} />
        ))}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    tables: state.tables.tables,
  };
}

export default connect(
  mapStateToProps,
  { ...TableActions },
)(TableList);
