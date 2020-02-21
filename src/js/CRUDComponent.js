/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */

export default class CRUDComponent {
  constructor(parentEl, obj) {
    this.parentEl = parentEl;
    const { title, columns, rows } = obj;
    this.title = title;
    this.columns = columns;
    this.rows = rows;
    this.ident = '';
  }

  get markup() {
    return `
    <div data-id="CRUD-main-table">
      <div data-id="CRUD-tableHeader" class="CRUDtableHeader">
        <h1>${this.title}</h1>
        <span data-id=CRUD-add-button class="CRUDbtn CRUDAddButton"></span>
      </div>
      <table>
        <thead>
          <tr data-id="CRUD-theadrow"></tr>
        </thead>
        <tbody data-id="CRUD-tbody"></tbody>
      </table>
    </div>
    <div data-id="CRUD-modal-edit" class="CRUDEditModalWindow"></div>
    `;
  }

  get myCRUDMainTable() {
    return '[data-id=CRUD-main-table]';
  }

  get myCRUDtAddButton() {
    return '[data-id=CRUD-add-button]';
  }

  get myCRUDtableHeader() {
    return '[data-id=CRUD-tableHeader]';
  }

  get myCRUDtheadrow() {
    return '[data-id=CRUD-theadrow]';
  }

  get myCRUDtbody() {
    return '[data-id=CRUD-tbody]';
  }

  get myCurrentEditRecord() {
    return '.CurrentEditRecord';
  }

  get myCRUDmodalEdit() {
    return '[data-id=CRUD-modal-edit]';
  }

  get myCRUDModalEditConfirm() {
    return '[data-id=CRUD-modal-edit-confirm]';
  }

  get myCRUDModalEditCancel() {
    return '[data-id=CRUD-modal-edit-cancel]';
  }

  get myCRUDModalEditContent() {
    return '[data-id=CRUD-modal-edit-content]';
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.markup;
    this.redrawDataTable();
  }

  // prepare data content for Modal dialog box
  rowEdit() {
    const myCurrentEditRecord = this.parentEl.querySelector(this.myCurrentEditRecord);
    // make data row for modat edit
    const EditRec = {};
    for (const col of this.columns) {
      EditRec[col.name] = '';
    }
    if (myCurrentEditRecord) {
      // take data for edit in modal
      const { identColumn, currentRecID } = this.getIDStructure();
      const rec = this.rows.find((o) => o[identColumn] === currentRecID);
      for (let k = 0; k < this.columns.length; k++) {
        EditRec[this.columns[k].name] = rec[this.columns[k].name];
      }
      this.showEditModal(EditRec, 'Редактирование записи');
    } else {
      this.showEditModal(EditRec, 'Ввод новой записи');
    }
  }

  // Open Modal dialog box
  showEditModal(EditRec, title) {
    const myCRUDmodalEdit = this.parentEl.querySelector(this.myCRUDmodalEdit);
    myCRUDmodalEdit.innerHTML = `
    <form action="/" method="post" class="CRUDBorderStyle">
      <div class="CRUDEditModalHeader">
        <span class="CRUDEditModalTitle">${title}</span>
      </div>
      <div data-id="CRUD-modal-edit-content" class="CRUDEditModalContent"></div>
      <div class="CRUDEditModalFooter">
        <button data-id="CRUD-modal-edit-confirm" type="submit">Подтвердить</button>
        <button data-id="CRUD-modal-edit-cancel" type="reset">Отменить</button>
      </div>
    </form>
    `;
    // render edit record inputs
    const CRUDEditModalContent = this.parentEl.querySelector(this.myCRUDModalEditContent);
    // CRUDEditModalContent.innerHTML += '<table class="CRUDNoStyle"><tbody>';
    const CRUDEditModalContentTable = document.createElement('table');
    CRUDEditModalContent.appendChild(CRUDEditModalContentTable);
    CRUDEditModalContentTable.classList.add('CRUDNoStyle');
    const CRUDEditModalContentTbody = document.createElement('tbody');
    CRUDEditModalContentTable.appendChild(CRUDEditModalContentTbody);

    for (let k = 0; k < this.columns.length; k++) {
      const CRUDEditModalContentTr = document.createElement('tr');
      CRUDEditModalContentTbody.appendChild(CRUDEditModalContentTr);
      const FieldName = this.columns[k].name;
      const FieldTitle = this.columns[k].title;
      const FieldValue = EditRec[FieldName];
      const FieldAttr = this.columns[k].attr;
      const InputDataId = `CRUD-edit-${FieldName}`;
      const errText = this.columns[k].err;
      let tx = '';
      tx += `<td class="CRUDNoStyle"><label for "${InputDataId}">${FieldTitle}</label></td>`;
      tx += `<td class="CRUDNoStyle"><input data-id="${InputDataId}" type="text" ${FieldAttr} value="${FieldValue}"></td>`;
      CRUDEditModalContentTr.innerHTML += tx;
      // field validity check
      const fld = CRUDEditModalContentTr.querySelector(`[data-id=${InputDataId}]`);
      if (fld) {
        fld.addEventListener('input', () => {
          if (fld.checkValidity()) {
            this.cleanupErrMessages();
          }
        });
        fld.addEventListener('focusout', () => {
          if (fld.checkValidity()) {
            this.cleanupErrMessages();
          }
        });
        fld.addEventListener('invalid', () => {
          // eslint-disable-next-line no-alert
          const CRUDvalidityPopover = document.createElement('span');
          const elPos = fld.getBoundingClientRect();
          myCRUDmodalEdit.appendChild(CRUDvalidityPopover);
          CRUDvalidityPopover.classList.add('CRUDvalidityPopover', 'CRUDonFront');
          CRUDvalidityPopover.innerText = `${errText}`;
          CRUDvalidityPopover.style.top = `${elPos.Top + fld.offsetHeight - 200}px`;
          CRUDvalidityPopover.style.left = `${elPos.Left}px`;
        });
        fld.addEventListener('focusin', () => {
          this.cleanupErrMessages();
        });
      }
    }
    // render Modal buttons: "Confirm"
    const myCRUDModalEditConfirm = this.parentEl.querySelector(this.myCRUDModalEditConfirm);
    myCRUDModalEditConfirm.addEventListener('click', (event) => {
      event.preventDefault();
      const myCurrentEditRecord = this.parentEl.querySelector(this.myCurrentEditRecord);
      if (myCurrentEditRecord) {
        const { identColumn, currentRecID } = this.getIDStructure();
        const rec = this.rows.find((o) => o[identColumn] === currentRecID);
        for (const col of this.columns) {
          const FieldName = col.name;
          const InputDataElement = myCRUDmodalEdit.querySelector(`[data-id=CRUD-edit-${FieldName}]`);
          rec[FieldName] = InputDataElement.value;
        }
      } else {
        const rec = {};
        for (const col of this.columns) {
          const FieldName = col.name;
          const InputDataElement = myCRUDmodalEdit.querySelector(`[data-id=CRUD-edit-${FieldName}]`);
          rec[FieldName] = InputDataElement.value;
        }
        this.rows.push(rec);
      }
      this.bindToDOM();
    });
    // render Modal buttons: "Cancel"
    const myCRUDModalEditCancel = this.parentEl.querySelector(this.myCRUDModalEditCancel);
    myCRUDModalEditCancel.addEventListener('click', (event) => {
      event.preventDefault();
      this.bindToDOM();
    });
    const myCRUDMainTable = this.parentEl.querySelector(this.myCRUDMainTable);
    this.cascadeSetVisible(myCRUDMainTable, 'CRUDonBack', 'CRUDonFront');
    this.cascadeSetVisible(myCRUDmodalEdit, 'CRUDonFront', 'CRUDonBack');
    myCRUDmodalEdit.style.top = `${(window.innerHeight - myCRUDMainTable.offsetHeight) / 3}px`;
    myCRUDmodalEdit.style.left = `${(window.innerWidth - myCRUDmodalEdit.offsetWidth) / 2}px`;
  }

  // Render main data table
  redrawDataTable() {
    // Add button method
    const myCRUDtAddButton = this.parentEl.querySelector(this.myCRUDtAddButton);
    myCRUDtAddButton.addEventListener('click', () => {
      this.rowEdit();
    });
    const myCRUDtheadrow = this.parentEl.querySelector(this.myCRUDtheadrow);
    const myCRUDtbody = this.parentEl.querySelector(this.myCRUDtbody);
    // render table columns
    for (const col of this.columns) {
      if (col.typ.includes('ident')) {
        this.ident = col.name;
      }
      if (!col.typ.includes('hidden')) {
        const th = document.createElement('th');
        myCRUDtheadrow.appendChild(th);
        th.innerText = col.title;
      }
    }
    const extrath = document.createElement('th');
    myCRUDtheadrow.appendChild(extrath);
    extrath.innerText = 'Действия';
    // render table rows
    for (const row of this.rows) {
      const tr = document.createElement('tr');
      tr.setAttribute('data-id', `Data_Row_${row[this.ident]}`);
      myCRUDtbody.appendChild(tr);
      for (const col of this.columns) {
        if (!col.typ.includes('hidden')) {
          const td = document.createElement('td');
          tr.appendChild(td);
          td.innerText = row[col.name];
          if (col.classes) {
            const cList = col.classes.split(' ');
            for (const cl of cList) {
              td.classList.add(cl);
            }
          }
        }
      }
      // extra column for action controls
      const extratd = document.createElement('td');
      tr.appendChild(extratd);
      extratd.classList.add('actionCol');
      // Edit Row button
      const CRUDEditButton = document.createElement('span');
      extratd.appendChild(CRUDEditButton);
      CRUDEditButton.classList.add('CRUDRowbtn', 'CRUDEditButton');
      CRUDEditButton.addEventListener('click', () => {
        for (const el of myCRUDtbody.children) {
          el.classList.remove('CurrentEditRecord');
        }
        tr.classList.add('CurrentEditRecord');
        this.rowEdit();
      });
      // Delete Row button
      const CRUDDeleteButton = document.createElement('span');
      extratd.appendChild(CRUDDeleteButton);
      CRUDDeleteButton.classList.add('CRUDRowbtn', 'CRUDDeleteButton');
      CRUDDeleteButton.addEventListener('click', () => {
        for (const el of myCRUDtbody.children) {
          el.classList.remove('CurrentEditRecord');
        }
        tr.classList.add('CurrentEditRecord');
        const doDelete = () => {
        // eslint-disable-next-line no-alert
          if (window.confirm('Внимание! Запись будет удалена!')) {
            const { identColumn, currentRecID } = this.getIDStructure();
            const recIndex = this.rows.findIndex((o) => o[identColumn] === currentRecID);
            // eslint-disable-next-line no-extra-boolean-cast
            if (typeof (recIndex) === 'number') {
              this.rows.splice(recIndex, 1);
            }
          }
          this.bindToDOM();
        };
        setTimeout(doDelete, 500);
      });
    }
  }

  cascadeSetVisible(el, class2add, class2remove) {
    el.classList.remove(class2remove);
    el.classList.add(class2add);
    for (const child of el.children) {
      child.classList.remove(class2remove);
      child.classList.add(class2add);
      this.cascadeSetVisible(child, class2add, class2remove);
    }
  }

  getIDStructure() {
    if (this.ident) {
      const myCurrentEditRecord = this.parentEl.querySelector(this.myCurrentEditRecord);
      const currentRecID = myCurrentEditRecord.getAttribute('data-id');
      if (currentRecID) {
        const id = currentRecID.replace('Data_Row_', '');
        return {
          identColumn: this.ident,
          currentRecID: id,
        };
      }
    }
    return undefined;
  }

  cleanupErrMessages() {
    const allInvalids = this.parentEl.querySelectorAll('.CRUDvalidityPopover');
    for (const el of allInvalids) {
      // eslint-disable-next-line no-unused-expressions
      el.remove;
    }
  }
}
