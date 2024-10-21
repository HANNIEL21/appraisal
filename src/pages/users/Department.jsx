import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faculties } from '../../engine_config'; // Assuming this contains the faculties data

const Department = () => {
  const navigate = useNavigate();
  const { dept } = useParams();
  const selectedFaculty = faculties.find(fac => fac.name === dept);

  console.log(dept);
  console.log(faculties);
  

  return (
    <div className='h-screen w-full flex items-center justify-center bg-slate-500'>
      <main>
        <section>
          {
            selectedFaculty ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">{selectedFaculty.name} Departments</h2>
                <div className='grid grid-cols-4 gap-8'>
                  {selectedFaculty.departments.map((department, i) => (
                    <div 
                    key={i} 
                    className="shadow-md bg-slate-400 p-4 font-bold capitalize rounded-md text-center cursor-pointer" 
                    onClick={()=> navigate("/lecturer")}
                    >
                      {department}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>No faculty found for {dept}</p>
            )
          }
        </section>
      </main>
    </div>
  );
}

export default Department;
