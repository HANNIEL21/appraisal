import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import { activities } from '../../utils/constant';

const Questioniar = ({ candidate, data, userDetails, baseApiUrl }) => {
    const navigate = useNavigate();

    const options = [1, 2, 3, 4, 5]; // Assuming options represent scores

    // State for selected activities and total score
    const [selectedActivities, setSelectedActivities] = useState(activities.map(activity => ({ ...activity, selectedOption: null })));
    const [score, setScore] = useState(0);

    const handleOptionSelect = (qid, selectedOption) => {
        setSelectedActivities((prevActivities) =>
            prevActivities.map((activity) =>
                activity.id === qid
                    ? { ...activity, selectedOption }
                    : activity
            )
        );

        const questionToUpdate = selectedActivities.find((activity) => activity.id === qid);
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
                setSelectedActivities(activities.map(activity => ({ ...activity, selectedOption: null }))); // Reset selections
            }
        } catch (error) {
            console.error("Error submitting form: ", error);
        }
    };

    return (
        <div className="w-full bg-">
            <header>
                <button className='text-black px-4 py-2 rounded-lg' onClick={() => navigate(-1)}>
                    <FaChevronLeft />
                </button>
            </header>
            <main>
                <section className='py-10 px-8 flex items-center justify-center'>
                    <div>
                        <div className='h-[200px] w-[200px] md:h-[300px] md:w-[300px] rounded-xl bg-black'></div>
                        <div className='text-center'>
                            <h2 className='font-bold uppercase '>Lecturer's Name</h2>
                            <h2 className='capitalize'>Department</h2>
                        </div>
                    </div>
                </section>
                <section className="h-full w-full  flex items-center justify-center px-4">
                    <div className="mb-8 md:w-[600px]">
                        <h1 className="md:text-2xl font-bold mb-4">Activities</h1>
                        {selectedActivities.map((activity) => (
                            <div key={activity.id} className="flex justify-between items-center border-b-2 py-3">
                                <h3 className="text-lg w-2/4">{activity.name}</h3>
                                <div className='w-2/4 flex justify-between'>
                                    {options.map((option) => (
                                        <label key={option}>
                                            <input
                                                type="radio"
                                                name={`${activity.id}-question`}
                                                className="form-radio h-5 w-5"
                                                value={option}
                                                onChange={() => handleOptionSelect(activity.id, option)}
                                                checked={activity.selectedOption === option}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <div className="px-4 md:px-32 py-10 flex justify-between">
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
