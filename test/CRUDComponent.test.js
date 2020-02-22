import CRUDComponent from '../src/js/CRUDComponent';

const testData = {
  title: 'test',
  columns: [
    {
      name: 'id', title: 'ID', applTyp: 'ident', customAttr: 'required', CSSclasses: '',
    },
    {
      name: 'name', title: 'Название', applTyp: '', CSSclasses: 'CRUDalignTextLeft',
    },
  ],
  rows: [
    {
      id: '101', name: 'Name1',
    },
    {
      id: '102', name: 'Name2',
    },
  ],
};

test('should render self', () => {
  document.body.innerHTML = '<div id="ComponentContainer"></div>';
  const container = document.querySelector('#ComponentContainer');
  const widget = new CRUDComponent(container, testData);
  widget.bindToDOM();
  expect(!!document.querySelector(widget.myCRUDMainTable)).toEqual(true);
});

test('should open Modal Edit window by "Add" button', () => {
  document.body.innerHTML = '<div id="ComponentContainer"></div>';
  const container = document.querySelector('#ComponentContainer');
  const widget = new CRUDComponent(container, testData);
  widget.bindToDOM();
  document.querySelector(widget.myCRUDtAddButton).click();
  const x = () => {
    expect(!!document.querySelector(widget.myCRUDmodalEdit)).toEqual(true);
  };
  setTimeout(x, 500);
});

test('should open Modal Edit window by "Edit" button', () => {
  document.body.innerHTML = '<div id="ComponentContainer"></div>';
  const container = document.querySelector('#ComponentContainer');
  const widget = new CRUDComponent(container, testData);
  widget.bindToDOM();
  document.querySelector('.CRUDEditButton').click();
  const x = () => {
    expect(!!document.querySelector('.CurrentEditRecord')).toEqual(true);
    expect(!!document.querySelector(widget.myCRUDmodalEdit)).toEqual(true);
  };
  setTimeout(x, 500);
});

test('should mark curr record by "delete" button', () => {
  document.body.innerHTML = '<div id="ComponentContainer"></div>';
  const container = document.querySelector('#ComponentContainer');
  const widget = new CRUDComponent(container, testData);
  widget.bindToDOM();
  document.querySelector('.CRUDDeleteButton').click();
  const x = () => {
    expect(!!document.querySelector('.CurrentEditRecord')).toEqual(true);
  };
  setTimeout(x, 1000);
});

test('should switch back screen shadow', () => {
  document.body.innerHTML = '<div id="ComponentContainer"></div>';
  const container = document.querySelector('#ComponentContainer');
  const widget = new CRUDComponent(container, testData);
  widget.bindToDOM();
  expect(!!document.querySelector('.CRUDonBack')).toEqual(false);
  document.querySelector('.CRUDEditButton').click();
  const x = () => {
    expect(!!document.querySelector('.CRUDonBack')).toEqual(true);
    document.querySelector(widget.myCRUDModalEditCancel).click();
  };
  const y = () => {
    expect(!!document.querySelector('.CRUDonBack')).toEqual(false);
  };
  setTimeout(x, 500);
  setTimeout(y, 1000);
});

test('should NOT switch back screen shadow', () => {
  document.body.innerHTML = '<div id="ComponentContainer"></div>';
  const container = document.querySelector('#ComponentContainer');
  const widget = new CRUDComponent(container, testData);
  widget.bindToDOM();
  expect(!!document.querySelector('.CRUDonBack')).toEqual(false);
  document.querySelector('.CRUDEditButton').click();
  document.querySelector(widget.myCRUDModalEditConfirm).click();
  // required fields, confirm will not happen
  const x = () => {
    expect(!!document.querySelector('.CRUDonBack')).toEqual(true);
  };
  setTimeout(x, 500);
});

test('back screen shadow by cascadeSetVisible()', () => {
  document.body.innerHTML = '<div id="ComponentContainer"></div>';
  const container = document.querySelector('#ComponentContainer');
  const widget = new CRUDComponent(container, testData);
  widget.bindToDOM();
  widget.cascadeSetVisible(
    document.querySelector(widget.myCRUDMainTable),
    'CRUDonBack',
    'CRUDonFront',
  );
  const x = () => {
    expect(!!document.querySelector('.CRUDonBack')).toEqual(true);
  };
  setTimeout(x, 500);
});

test('should getIDStructure() return undefined', () => {
  document.body.innerHTML = '<div id="ComponentContainer"></div>';
  const container = document.querySelector('#ComponentContainer');
  const widget = new CRUDComponent(container, testData);
  widget.bindToDOM();
  expect(widget.getIDStructure()).toEqual(undefined);
});
