import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";

const Questioniar = ({ candidate, data, userDetails, baseApiUrl }) => {
    const navigate = useNavigate();
    // Sample activities with unique IDs and questions
    const [activities, setActivities] = useState([
        { id: 1, items: "Question 1", selectedOption: null },
        { id: 2, items: "Question 2", selectedOption: null },
        { id: 3, items: "Question 3", selectedOption: null },
        { id: 4, items: "Question 4", selectedOption: null },
        { id: 5, items: "Question 5", selectedOption: null },
    ]);

    const options = [1, 2, 3, 4, 5]; // Assuming options represent scores

    const [score, setScore] = useState(0);

    const handleOptionSelect = (qid, selectedOption) => {
        setActivities((prevActivities) =>
            prevActivities.map((question) =>
                question.id === qid
                    ? { ...question, selectedOption }
                    : question
            )
        );

        const questionToUpdate = activities.find((question) => question.id === qid);
        if (!questionToUpdate) return;

        const previousScoreValue = questionToUpdate.selectedOption ? parseInt(questionToUpdate.selectedOption) : 0;
        const newScoreValue = parseInt(selectedOption);
        const scoreDifference = newScoreValue - previousScoreValue;

        setScore((prevScore) => prevScore + scoreDifference);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = {
            firstname: candidate?.firstname,
            lastname: candidate?.lastname,
            examno: candidate?.examno,
            seatno: candidate?.seatno,
            exam: data[0]?.exam,
            title: data[0]?.title,
            course: data[0]?.course,
            examiner: userDetails.username,
            score: score,
        };

        try {
            const response = await axios.post(`${baseApiUrl}/result.php`, formdata);
            if (response.status === 200) {
                console.log(response.data);
                setScore(0);
                setActivities(prevActivities => prevActivities.map(activity => ({ ...activity, selectedOption: null }))); // Reset selections
            }
        } catch (error) {
            console.error("Error submitting form: ", error);
        }
    };

    return (
        <div className="w-full">
            <header>
                <button className='text-black px-4 py-2 rounded-lg' onClick={() => navigate(-1)}>
                    <FaChevronLeft />
                </button>
            </header>
            <main>
                <section className='py-10 px-8'>
                    <div>
                        <div className='h-28 w-28 rounded-full bg-black'></div>
                        <div>

                        </div>
                    </div>
                </section>
                <section className="h-full w-full px-4">
                    <div className="mb-8">
                        <div className="flex justify-between items-center">
                            <h1 className="md:text-2xl font-bold mb-4">Activities</h1>
                            <div className="w-2/4 flex justify-between md:text-2xl font-bold mb-4">
                                {activities.map(activity => <p key={activity.id}>{activity.id}</p>)}
                            </div>
                        </div>
                        {activities.map((question) => (
                            <div key={question.id} className="flex justify-between items-center border-b-2 py-3">
                                <h3 className="text-lg">{question.items}</h3>
                                <div className='w-2/4 flex justify-between'>
                                    {options.map((option) => (
                                        <label key={option}>
                                            <input
                                                type="radio"
                                                name={`${question.id}-question`}
                                                className="form-radio h-5 w-5"
                                                value={option}
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
                <div className="px-4 md:px-32 py-10 flex justify-between">
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