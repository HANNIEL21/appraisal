import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import logo from "../../assets/rsu-logo.png";
import { appName, baseUrl } from '../../utils/constant';
import { setEmail, setError, setUser } from '../../redux/features/Auth';
import Alert from '../../component/Alert';

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { auth } = useSelector((state) => state.auth);

    const handleLogin = async () => {
        if (auth.email === "" || auth.password === "") {
            dispatch(setError("Please fill in all fields"));
            Alert("error", "Please fill in all fields");
            return;
        }

        try {
            const res = await axios.post(`${baseUrl}/auth.php?action=login`, {
                email: auth.email,
            });

            const parsedData = JSON.parse(res.data.replace("Response: ", "").replace("null", ""));

            console.log(parsedData.data);

            if (res.status === 200) {
                Alert("success", res.data.message || "Login successful");
                dispatch(setUser(parsedData.data));
                navigate("/info");
            } else {
                dispatch(setError(res.data.message || "Login failed"));
                Alert("error", res.data.message || "Login failed");
            }
        } catch (error) {
            dispatch(setError("An error occurred. Please try again."));
            Alert("error", "An error occurred. Please try again.");
        }
    }

    return (
        <main className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
            <div className='hidden md:flex w-2/4 h-full bg-white md:justify-center md:items-center'>
                <img src={logo} alt="rsu logo" className='w-[50%] h-[40%]' />
            </div>
            <div className='md:w-3/4 flex justify-center items-center'>
                <div className='md:w-[50%] h-[400px] p-4 flex justify-between items-center flex-col text-center'>
                    <h1 className='text-4xl font-bold text-blue-900 uppercase'>{appName}</h1>

                    {/* Email Input */}
                    <input
                        type="text"
                        placeholder='USERNAME / MATT NO'
                        className='w-[80%] bg-transparent border-2 outline-none focus:outline-blue-900 rounded-md p-3 text-lg font-bold text-blue-900 shadow-md'
                        name="email"
                        value={auth.email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        autoFocus
                    />

                    {/* Login Button */}
                    <button
                        className='block w-[70%] border-2 rounded-md border-blue-900 hover:bg-blue-900 font-bold text-xl hover:text-white text-blue-900 px-10 py-2 shadow-md mt-6'
                        onClick={handleLogin}
                    >
                        LOGIN
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Auth;
