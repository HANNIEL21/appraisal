import React from 'react';
import { IoPerson } from "react-icons/io5";
import Alert from '../../../components/Alert';

const Questioniar = () => {
  
    return (
        <div className="w-full">
            <main>
                <section className="w-full bg-white rounded-lg p-32">
                    <div className="flex gap-32 justify-center items-center">
                        <div className='h-60 w-60 bg-slate-200 rounded-md flex items-center justify-center'>
                            {candidate && candidate.avatar ? (
                                <>
                                    <img src={`${baseApiUrl}/images/${candidate?.avatar}`} alt="User Avatar"
                                        className='w-full h-full rounded-md shadow-md' />
                                </>
                            ) : (
                                <>
                                    < IoPerson className='text-white text-6xl' />
                                </>
                            )
                            }
                        </div>
                        <div className="w-3/4 text-wrap flex flex-col gap-4">
                            <h1 className="font-extrabold text-4xl bg-gradient-to-r from-green-700 to-blue-700 text-transparent bg-clip-text">
                                DEPARTMENT OF NURSING SCIENCES, RIVERS STATE UNIVERSITY, PORT HARCOURT
                            </h1>
                            <h2 className="font-semibold text-base">
                                PRE-PROFESSIONAL EXAMINATION FOR GENERAL NURSES JANUARY, 2024 OSCE {data[0]?.title} CHECKLIST
                            </h2>
                            <div className="flex flex-col gap-5">
                                <label htmlFor="candidateNo" className="flex flex-col">
                                    <p className="font-bold text-base">
                                        Candidate's Number: <span className="text-red-500 text-lg">*</span>
                                    </p>
                                    <input
                                        type="text"
                                        name="candidateNo"
                                        id="candidateNo"
                                        onChange={(e) => handleChange(e)}
                                        onKeyDown={(e) => handleKeyDown(e)}
                                        className="border-2 w-3/4 text-sm rounded-md p-2 focus:border-blue-700 focus:outline-none"
                                        placeholder="DE.****/****"
                                    />
                                </label>
                                <label htmlFor="candidateName" className="flex flex-col">
                                    <p className="font-bold text-base">
                                        Candidate's Name: <span className="text-red-500 text-lg">*</span>
                                    </p>
                                    <input
                                        type="text"
                                        name="candidateName"
                                        id="candidateName"
                                        value={`${candidate.firstname} ${candidate.lastname}`}
                                        className="border-2 w-3/4 text-sm rounded-md p-2 focus:border-blue-700 focus:outline-none"
                                        placeholder="firstname.lastname"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="h-full w-full py-10 px-32">
                    <div className="mb-8">
                        <div className="flex justify-between items-center">
                            <div className="w-3/4">
                                <h1 className="text-2xl font-bold mb-4">Activities</h1>
                            </div>
                            <div className="w-3/4 flex justify-between text-2xl font-bold mb-4">
                                <p>0</p>
                                <p>1/4</p>
                                <p>1/2</p>
                                <p>1</p>
                            </div>
                        </div>
                        {activities?.map((question) => (
                            <div key={question.id} className="w-full flex justify-between items-center border-b-2 py-3">
                                <div className="w-1/4">
                                    <h3 className="text-lg text-wrap">{question.question}</h3>
                                </div>
                                <div className="w-2/4 flex justify-between">
                                    {question.options.map((option, index) => (
                                        <label key={index}>
                                            <input
                                                type="radio"
                                                name={`${question.id}-question`}
                                                className="form-radio h-5 w-5"
                                                onChange={() => handleOptionSelect(question.id, option)}
                                                checked={question.selectedOption === option}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <div className="px-32 py-10 flex justify-between">
                    <h1 className="text-2xl font-semibold">Total Score: {score}</h1>
                    <button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-green-700 to-blue-700 hover:border-3 hover:border-blue-700 text-white px-6 py-2 font-bold rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Questioniar;
