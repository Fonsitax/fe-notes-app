import {useRef, useState} from 'react';
import {Charts} from '@/components/Diary';
import {postCompletion} from "@/api/gen-ai.js";

const MoodAIAnalysis = ({entries}) => {
    const modalRef = useRef();
    const [summary, setSummery] = useState('');

    const handleAISummary = async () => {
        const messages = [
            {
                "role": "user",
                "content": 'Can you create a mood/sentiment analysis based on the content of the following diary entries:'
            }
        ];

        entries.forEach(entry => messages.push({
            "role": "user",
            "content": entry.content
        }))

        console.log(messages)
        const response = await postCompletion(messages);
        console.log(response)
        if (response) setSummery(response.message.content);
    };


    return (
        <>
            <div className='fixed bottom-4 right-4'>
                <button
                    onClick={() => modalRef.current.showModal()}
                    className='bg-purple-400 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded-full shadow-lg w-10 h-10'
                >
                    ✨
                </button>
            </div>
            <dialog id='modal-note' className='modal' ref={modalRef}>
                <div className='modal-box h-[600px] py-0 w-11/12 max-w-5xl'>
                    <div className='modal-action items-center justify-between mb-2'>
                        <h1 className='text-2xl text-center'>Get your AI Gen Mood Analysis</h1>
                        <form method='dialog'>
                            <button className='btn'>&times;</button>
                        </form>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='textarea textarea-success w-1/2 h-[400px] overflow-y-scroll'>
                            {summary}
                        </div>
                        <div className='textarea textarea-success w-1/2 h-[400px] overflow-y-scroll'>
                            <Charts aiSummary=''/>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button
                            className='mt-5 btn bg-purple-500 hover:bg-purple-400 text-white'
                            onClick={handleAISummary}
                        >
                            Gen AI mood analysis ✨
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default MoodAIAnalysis;
