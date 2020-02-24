import CRUDComponent from './CRUDComponent';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#ComponentContainer');
  const widget = new CRUDComponent(container, {
    title: 'Товары',
    columns: [
      {
        name: 'id',
        title: '№ поз.',
        applTyp: 'ident hidden',
        inputTyp: 'text',
        inputSize: '12',
        customAttr: 'required',
        CSSclasses: '',
      },
      {
        name: 'name',
        title: 'Название',
        applTyp: '',
        inputTyp: 'text',
        inputSize: '32',
        customAttr: 'required',
        CSSclasses: 'CRUDalignTextLeft',
      },
      {
        name: 'price',
        title: 'Стоимость',
        applTyp: '',
        inputSize: '',
        inputTyp: 'number',
        customAttr: 'required pattern="[0-9]+" min="1"',
        CSSclasses: '',
      },
    ],
    rows: [
      { id: '101', name: 'iPhone XR', price: 60000 },
      { id: '102', name: 'Samsung Galaxy S10+', price: 80000 },
      { id: '103', name: 'Huawei View', price: 50000 },
    ],
  });
  widget.bindToDOM();
  // eslint-disable-next-line no-console
  console.log('Component started!');
});
