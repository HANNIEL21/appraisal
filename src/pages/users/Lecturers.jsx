import React from 'react';

const Lecturers = () => {

  const lecturers = [
    { id: 1, firstname: "John", lastname: "Doe", department: "Computer Science", image: "https://via.placeholder.com/150" },
    { id: 2, firstname: "Jane", lastname: "Smith", department: "Mechanical Engineering", image: "https://via.placeholder.com/150" },
    { id: 3, firstname: "Michael", lastname: "Johnson", department: "Business Administration", image: "https://via.placeholder.com/150" },
    { id: 4, firstname: "Emily", lastname: "Davis", department: "Law", image: "https://via.placeholder.com/150" },
    { id: 5, firstname: "Robert", lastname: "Brown", department: "Medicine", image: "https://via.placeholder.com/150" },
    { id: 6, firstname: "Linda", lastname: "Martinez", department: "Architecture", image: "https://via.placeholder.com/150" }
  ];

  return (
    <div className='h-screen w-full flex items-center justify-center bg-slate-400'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6'>
        {lecturers.map((item, i) => (
          <div key={i} className='bg-white shadow-lg rounded-lg overflow-hidden'>
            <img className='h-32 w-full object-cover' src={item.image} alt={`${item.firstname} ${item.lastname}`} />
            <div className='p-4'>
              <p className='text-gray-600 text-sm'>{item.department}</p>
              <h1 className='text-lg font-bold'>{item.firstname} {item.lastname}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lecturers;
