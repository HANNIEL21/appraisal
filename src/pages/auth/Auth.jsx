import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/rsu-logo.png";
import { appName } from '../../utils/constant';

const Auth = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/info");
    }

    return (
        <main className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
            <div className='hidden md:flex w-2/4 h-full bg-white md:justify-center md:items-center'>
                <img src={logo} alt="rsu logo" className='w-[50%] h-[40%]' />
            </div>
            <div className='md:w-3/4 flex justify-center items-center'>
                <div className='md:w-[50%] h-[350px] p-4 flex justify-between items-center flex-col text-center'>
                    <h1 className='text-4xl font-bold text-blue-900 uppercase'>{appName}</h1>
                    <input
                        type="text"
                        placeholder='USERNAME / MATT NO'
                        className='w-[80%] bg-transparent border-2 outline-none focus:outline-blue-900 rounded-md p-3 text-lg font-bold text-blue-900 shadow-md'
                        // value={username}
                        onChange={(e) => {
                        }}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                            }
                        }}
                    />
                    <button className=' block w-[70%] border-2 rounded-md border-blue-900 hover:bg-blue-900 font-bold text-xl hover:text-white text-blue-900 px-10 py-2 shadow-md' onClick={handleLogin}>
                        LOGIN
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Auth;
