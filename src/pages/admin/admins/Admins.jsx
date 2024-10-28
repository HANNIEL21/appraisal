import React, { useState } from 'react'
import Table from '../../../component/Table'
import { FiPlus } from 'react-icons/fi'
import Add from './Add';
import Delete from './Delete';
import { MdDelete, MdEdit } from 'react-icons/md';
import Edit from './Edit';

const Admins = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openModal = (modalName, id) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddModal(true);
        break;
      case 'edit':
        setSelectedId(id);
        setIsOpenEditModal(true);
        break;
      case 'delete':
        setSelectedId(id);
        setIsOpenDeleteModal(true);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case 'add':
        setIsOpenAddModal(false);
        break;
      case 'edit':
        setIsOpenEditModal(false);
        break;
      case 'delete':
        setIsOpenDeleteModal(false);
        break;
      default:
        console.error('Invalid modal name');
    }
  };

  const data = [
    { id: 1, firstname: "John", lastname: "doe", role: "ADMIN" }
  ]

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'FIRSTNAME',
      selector: row => row.firstname,
      sortable: true,
    },
    {
      name: 'LASTNAME',
      selector: row => row.lastname,
      sortable: true,
    },
    {
      name: 'ROLE',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'ACTIONS',
      cell: row => (
        <div className='flex gap-4'>
          {/* Edit button */}
          <button
            onClick={() => openModal("edit", row.id)}
            className="border-2 border-green-700 hover:bg-green-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdEdit className='text-xl text-green-700' />
          </button>

          {isOpenEditModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <Edit closeEditModal={() => closeModal("edit")} id={selectedId} />
                </div>
              </div>
            </div>
          )}

          {/* Delete button */}
          <button
            onClick={() => openModal("delete", row.id)}
            className="border-2 border-red-700 hover:bg-red-300 text-white font-bold text-sm rounded-md px-1 py-1 focus:outline-none"
          >
            <MdDelete className='text-xl text-red-700' />
          </button>

          {isOpenDeleteModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <Delete closeDeleteModal={() => closeModal("delete")} qId={selectedId} />
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        title={"Admins"}
        columns={columns}
        data={data}
        filter={true}
        children={
          <>
            <button className='bg-slate-500 p-3 rounded-md' onClick={() => openModal("add")} ><FiPlus className='font-bold' /></button>
            {isOpenAddModal && (
              <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-slate-600 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <Add closeAddModal={() => closeModal("add")} />
                  </div>
                </div>
              </div>
            )}
          </>
        }
      />
    </div>
  )
}

export default Admins
