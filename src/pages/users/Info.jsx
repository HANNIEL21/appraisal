import React, { useState } from 'react'
import { faculties } from '../../utils/constant'
import img from '../../assets/student.jpg'
import { useNavigate } from 'react-router-dom'

const Info = () => {
    const navigate = useNavigate();
    const [selectedFaculty, setSelectedFaculty] = useState(null)

    const handleFacultyChange = (e) => {
        const facultyName = e.target.value
        const faculty = faculties.find(fac => fac.name === facultyName)
        setSelectedFaculty(faculty)
    }

    return (
        <main className='h-screen w-full flex items-center justify-center'>
            <div className='md:h-[90vh] md:w-[500px] h-full w-full'>
                {/* Background Image */}
                <img src={img} alt="Student" className="absolute inset-0 w-full h-full object-cover md:object-contain" />

                {/* Overlay */}
                <div className='absolute inset-0 bg-black opacity-50'></div>

                {/* Content */}
                <div className="relative z-10 p-4 h-full flex flex-col items-start justify-center">
                    <div className='flex flex-col gap-1 mb-3'>
                        <div className='bg-white p-4 rounded-lg'>
                            <img src={img} alt="Student" className='rounded-md' />
                        </div>
                        <h2 className='text-white uppercase font-extrabold text-xl'>student name</h2>
                        <div className='flex items-center justify-start gap-2'>
                            <p className='text-white capitalize'>faculty</p>
                            <p className='text-white font-bold'>||</p>
                            <p className='text-white capitalize'>matt no</p>
                        </div>
                    </div>

                    {/* Dropdowns */}
                    <div className='w-full flex items-center justify-center'>
                        {/* Faculty Dropdown */}
                        {!selectedFaculty && (
                            <div className='w-full flex items-center space-x-4'>
                                <select 
                                    name="faculty" 
                                    id="faculty-select" 
                                    className="w-full bg-white p-2 rounded-md"
                                    onChange={handleFacultyChange}
                                >
                                    <option value="">Select Faculty</option>
                                    {
                                        faculties.map((item, i) => (
                                            <option key={i} value={item.name}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        )}

                        {/* Department Dropdown */}
                        {selectedFaculty && (
                            <div className='w-full flex flex-col justify-center items-center gap-5'>
                                <select 
                                    name="department" 
                                    id="department-select" 
                                    className="w-full bg-white p-2 rounded-md"
                                >
                                    <option value="">Select Department</option>
                                    {
                                        selectedFaculty.departments.map((dept, i) => (
                                            <option key={i} value={dept}>{dept}</option>
                                        ))
                                    }
                                </select>
                                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 font-bold" onClick={()=> navigate('/form')} >
                                    Proceed
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Info
