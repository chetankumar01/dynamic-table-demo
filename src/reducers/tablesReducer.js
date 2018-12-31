import produce from 'immer';
import faker from 'faker';
import { TableActions } from '../actions';

const initialState = {
  tables: [],
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TableActions.CREATE_TABLE:
        draft.tables.push(generateDummyTableData());
        break;
      case TableActions.SHOW_PREVIEW: {
        const { index, columns, rows } = action.payload;
        draft.tables[index].preview = { columns, rows };
        draft.tables[index].showPreview = true;
        break;
      }
      case TableActions.REVERT_PREVIEW: {
        const { index } = action.payload;
        draft.tables[index].showPreview = false;
        break;
      }
      case TableActions.APPLY_PREVIEW: {
        const { index } = action.payload;
        draft.tables[index].data = draft.tables[index].preview;
        draft.tables[index].showPreview = false;
        break;
      }
      default:
        return draft;
    }
  });

const generateDummyTableData = () => {
  let columns = ['Name', 'Email', 'Phone'];
  let rows = [];
  for (let i = 0; i < 5; i += 1) {
    rows = [
      ...rows,
      {
        Name: faker.fake('{{name.lastName}}, {{name.firstName}}'),
        Email: faker.internet.email(),
        Phone: faker.phone.phoneNumber(),
      },
    ];
  }
  return { data: { columns, rows } };
};
