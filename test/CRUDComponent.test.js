import CRUDComponent from '../src/js/CRUDComponent';

const testData = {
  title: 'test',
  columns: [
    {
      name: 'id', title: 'ID', classes: '', typ: 'id',
    },
    {
      name: 'name', title: 'Название', classes: 'CRUDalignTextLeft', typ: '',
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

/*
test('should open popover and verify its layout', () => {
  document.body.innerHTML = '<div id="ComponentContainer"></div>';
  const container = document.querySelector('#ComponentContainer');
  const widget = new PopOverComponent(container, { title: '', text: '' });
  widget.bindToDOM();
  const myPopover = document.querySelector(widget.myPopover);
  const myButton = container.querySelector(widget.myPowerButton);
  myButton.click();
  expect(myPopover.classList.contains('my-popover-invisible')).toBe(false);
  expect(myPopover.offsetwidth).toBe(myButton.offsetwidth);
  expect(myPopover.offsetTop).toBe(myButton.offsetTop - myPopover.offsetHeight);
  expect(myPopover.offsetLeft).toBe(myButton.offsetLeft);
});

test('should close popover click on button', () => {
  document.body.innerHTML = '<div id="ComponentContainer"></div>';
  const container = document.querySelector('#ComponentContainer');
  const widget = new PopOverComponent(container, { title: '', text: '' });
  widget.bindToDOM();
  const myPopover = document.querySelector(widget.myPopover);
  const myButton = container.querySelector(widget.myPowerButton);
  myButton.click(); // open
  myButton.click(); // close via button
  expect(myPopover.classList.contains('my-popover-invisible')).toBe(true);
});

test('should close popover click on itself', () => {
  document.body.innerHTML = '<div id="ComponentContainer"></div>';
  const container = document.querySelector('#ComponentContainer');
  const widget = new PopOverComponent(container, { title: '', text: '' });
  widget.bindToDOM();
  const myPopover = document.querySelector(widget.myPopover);
  const myButton = container.querySelector(widget.myPowerButton);
  myButton.click(); // open
  myPopover.click(); // close via popover
  expect(myPopover.classList.contains('my-popover-invisible')).toBe(true);
});
*/
