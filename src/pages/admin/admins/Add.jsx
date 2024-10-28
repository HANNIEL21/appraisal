import React, { useState } from 'react'
import Loader from '../../../component/Loader';
import { MdOutlineAdd } from 'react-icons/md';
import axios from 'axios';
import Alert from '../../../component/Alert';
import { baseUrl } from '../../../utils/constant';

const Add = ({ closeAddModal }) => {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        role: 'ADMIN',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const save = async () => {
        setLoading(true);
        try {
            console.log(formData);
            const res = await axios.post(`${baseUrl}/appointment.php`, formData);

            if (res.status === 201) {

                Alert("success", "Appointment Created");
            } else {
                Alert("error", "Failed to create appointment");
            }
        } catch (error) {
            console.error('An error occurred while saving the appointment:', error.message);
            Alert("error", "An error occurred. Please try again.");
        } finally {
            setLoading(false);
            closeAddModal();
        }
    };


    return (
        <div>
            {loading && <Loader />}

            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col items-start">
                    <div className='flex items-center justify-start gap-5'>
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                            <MdOutlineAdd className='text-green-500 text-base' />
                        </div>
                        <h3 className="text-lg font-bold uppercase text-slate-800" id="modal-title">Add Admin</h3>
                    </div>

                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <form className="flex flex-col gap-4 mt-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="firstname"
                                        id="firstname"
                                        className="border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="First Name"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="lastname"
                                        id="lastname"
                                        className="border-2 focus:border-blue-500 p-2 block w-full sm:text-sm border-slate-300 rounded-md"
                                        placeholder="Last Name"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="type" className="sr-only">Faculty</label>
                                    <select
                                        name="type"
                                        id="type"
                                        className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                        onChange={handleChange}
                                    >
                                        <option value="">Faculty</option>
                                        <option value="IN-PERSON">IN-PERSON</option>
                                        <option value="VIRTUAL">VIRTUAL</option>
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="type" className="sr-only">Department</label>
                                    <select
                                        name="type"
                                        id="type"
                                        className="border-2 focus:border-blue-500 block w-full sm:text-sm p-2 text-gray-400 border-slate-300 rounded-md"
                                        onChange={handleChange}
                                    >
                                        <option value="">Department</option>
                                        <option value="IN-PERSON">IN-PERSON</option>
                                        <option value="VIRTUAL">VIRTUAL</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    onClick={save}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 border-green-300 text-base font-medium text-green-700 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={closeAddModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border  shadow-sm px-4 py-2 bg-white text-base font-medium focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default Add
