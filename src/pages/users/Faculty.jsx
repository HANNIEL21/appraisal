import React from 'react'
import { useNavigate } from 'react-router-dom'

const Faculty = () => {
    const navigate = useNavigate();

    const faculties = [
        "Faculty of Agriculture",
        "Faculty of Education",
        "Faculty of Engineering",
        "Faculty of Environmental Sciences",
        "Faculty of Humanities",
        "Faculty of Law",
        "Faculty of Management Sciences",
        "Faculty of Medical Sciences",
        "Faculty of Science",
        "Faculty of Social Sciences"
    ]

    return (
        <div className='h-screen w-full flex items-center justify-center bg-slate-500 overflow-auto'>
            <main>
                <section className='grid grid-cols-1 md:grid-cols-3 gap-8 px-10'>
                    {
                        faculties.map((item, i) => (
                            <div 
                                key={i} 
                                className='shadow-md bg-slate-400 p-4 font-bold capitalize rounded-md text-center cursor-pointer flex items-center justify-center' 
                                onClick={() => navigate(`/department/${item}`)}
                            >
                                <p>{item}</p>
                            </div>
                        ))
                    }
                </section>
            </main>
        </div>
    )
}

export default Faculty
