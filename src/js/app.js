import CRUDComponent from './CRUDComponent';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#ComponentContainer');
  const widget = new CRUDComponent(container, {
    title: 'Товары',
    columns: [
      {
        name: 'id',
        title: '№ поз.',
        classes: '',
        typ: 'ident hidden',
        attr: 'required',
        err: 'Поле должно быть заполнено!',
      },
      {
        name: 'name',
        title: 'Название',
        classes: 'CRUDalignTextLeft',
        typ: '',
        attr: 'required',
        err: 'Поле должно быть заполнено!',
      },
      {
        name: 'price',
        title: 'Стоимость',
        classes: '',
        typ: '',
        attr: 'required pattern="[0-9]+" min=1',
        err: 'Цена должна быть больше 0!',
      },
    ],
    rows: [
      { id: '101', name: 'iPhone XR', price: '60000' },
      { id: '102', name: 'Samsung Galaxy S10+', price: '80000' },
      { id: '103', name: 'Huawei View', price: '50000' },
    ],
  });
  widget.bindToDOM();
  // eslint-disable-next-line no-console
  console.log('Component started!');
});
