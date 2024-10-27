import React, { useState } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const LecturerScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const lecturers = [
    { id: 1, firstname: "John", lastname: "Doe", department: "Computer Science", image: "https://via.placeholder.com/150" },
    { id: 2, firstname: "Jane", lastname: "Smith", department: "Mechanical Engineering", image: "https://via.placeholder.com/150" },
    { id: 3, firstname: "Michael", lastname: "Johnson", department: "Business Administration", image: "https://via.placeholder.com/150" },
    { id: 4, firstname: "Emily", lastname: "Davis", department: "Law", image: "https://via.placeholder.com/150" },
    { id: 5, firstname: "Robert", lastname: "Brown", department: "Medicine", image: "https://via.placeholder.com/150" },
    { id: 6, firstname: "Linda", lastname: "Martinez", department: "Architecture", image: "https://via.placeholder.com/150" }
  ];

  // Filter lecturers based on search query
  const filteredLecturers = lecturers.filter(lecturer =>
    lecturer.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lecturer.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lecturer.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='h-screen w-full bg-slate-400 overflow-auto md:flex md:items-center md:justify-center py-14'>
      <div className='absolute top-0 left-0 shadow-md w-full px-1 py-2 flex items-center'>
        <button className='text-black px-4 py-2 rounded-lg' onClick={() => navigate(-1)}>
          <FaChevronLeft />
        </button>
        <div className='ml-4'>
          <input
            type="text"
            className='p-1 rounded-md placeholder:text-sm'
            placeholder='Search For Lecturer'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className='px-4 grid grid-cols-1 md:grid-cols-4 gap-5 mt-4 md:w-3/4'>
        {filteredLecturers.length > 0 ? (
          filteredLecturers.map((item, i) => (
            <div key={i} className='bg-white shadow-lg rounded-lg overflow-hidden' onClick={()=> navigate("/form")}>
              <img className='h-32 w-full object-cover' src={item.image} alt={`${item.firstname} ${item.lastname}`} />
              <div className='p-4'>
                <p className='text-gray-600 text-sm'>{item.department}</p>
                <h1 className='text-lg font-bold'>{item.firstname} {item.lastname}</h1>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-3">
            <p className="text-gray-700 font-semibold">No lecturers found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturerScreen;
