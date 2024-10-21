import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoPerson } from "react-icons/io5";
import { baseApiUrl } from '../../../utils/constants';
import { setQuestions } from '../../../redux/Features/Exam';
import Alert from '../../../components/Alert';

const Questioniar = () => {
    const dispatch = useDispatch();

    const [candidate, setCandidate] = useState([]);
    const [examno, setExamno] = useState('');

    const { exams } = useSelector((state) => state.dashboard);
    const { questions, examDetails, isError, errorMessage } = useSelector((state) => state.exam);
    const { userDetails } = useSelector((state) => state.user);

    const [score, setScore] = useState(0);
    const [activities, setActivities] = useState([]);


    const data = exams.filter((exam) => exam.type === "CHECKLIST" && exam.examiner === userDetails.username);
    console.log(data);
    
    useEffect(() => {
        console.log(userDetails.username);

        const start = async () => {
            if (data.length > 0) {
                const response = await axios.get(`${baseApiUrl}/start.php?id=${data[0].exam_id}`);
                console.log(response.data);
                dispatch(setQuestions(response.data.questions));
            }
        };

        start();

        const newQuestions = questions?.map((question) => ({
            ...question,
            options: [question.opt1, question.opt2, question.opt3, question.opt4],
        }));

        setActivities(newQuestions);
    }, [dispatch]);

    const handleChange = (e) => {
        setExamno(e.target.value)
        console.log(examno);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            getCandidate();
        }
    };

    const getCandidate = async () => {
        try {
            const response = await axios.get(`${baseApiUrl}/candidate.php?examno=${examno}`);
            setCandidate(response.data); // Update candidate state with fetched data
            console.log(response.data); // Log fetched data
        } catch (error) {
            console.error('Error fetching candidate:', error);
        }
    };



    const handleOptionSelect = (qid, selectedOption) => {
        console.log(qid, selectedOption);

        setActivities((prevActivities) =>
            prevActivities.map((question) =>
                question.id === qid
                    ? { ...question, selectedOption }
                    : question
            )
        );

        const questionToUpdate = activities.find((question) => question.id === qid);
        if (!questionToUpdate) return;

        const previousScoreValue = questionToUpdate.selectedOption
            ? eval(questionToUpdate.selectedOption)
            : 0;
        const newScoreValue = eval(selectedOption);
        const scoreDifference = newScoreValue - previousScoreValue;
        console.log(newScoreValue);
        setScore((prevScore) => prevScore + scoreDifference);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = {
            firstname: candidate?.firstname,
            lastname: candidate?.lastname,
            examno: examno,
            seatno: candidate?.seatno,
            exam: data[0]?.exam,
            title: data[0]?.title,
            course: data[0]?.course,
            examiner: userDetails.username,
            score: score,
        };

        console.log(data);
        const response = await axios.post(`${baseApiUrl}/result.php`, formdata)
        if (response.status === 200) {
            console.log(response.data);
            setScore(0);
        }
    };

    if (data.length === 0) {
        return (
            <main className="h-full w-full py-10 px-32 flex items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">No Procedure</h1>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="flex justify-center items-center p-32">
                <p className="text-red-500 text-4xl capitalize">{errorMessage}</p>
            </main>
        );
    }

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
