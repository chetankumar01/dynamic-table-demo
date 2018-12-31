import { createAction } from 'redux-actions';

export const CREATE_TABLE = 'TABLE/CREATE_NEW';
export const createTable = createAction(CREATE_TABLE);

export const SHOW_PREVIEW = 'TABLE/SHOW_PREVEIW';
export const showPreview = createAction(SHOW_PREVIEW);

export const REVERT_PREVIEW = 'TABLE/REVERT_PREVEIW';
export const revertPreview = createAction(REVERT_PREVIEW);

export const APPLY_PREVIEW = 'TABLE/APPLY_PREVEIW';
export const applyPreview = createAction(APPLY_PREVIEW);
