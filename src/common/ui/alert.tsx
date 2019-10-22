import React from 'react';
import speechBubble from 'assets/icons/speech-bubble.svg';

export const Alert = props => {
    return (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p className="font-bold">Be Warned</p>
            <p>Something not ideal might be happening.</p>
        </div>
    );
};

export const ChatAlert = () => {
    return (
        <div className="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
            <div className="flex-shrink-0">
                <img className="h-12 w-12" src={speechBubble} alt="ChitChat Logo" />
            </div>
            <div className="ml-6 pt-1">
                <h4 className="text-xl text-gray-900 leading-tight">ChitChat</h4>
                <p className="text-base text-gray-600 leading-normal">You have a new message!</p>
            </div>
        </div>
    );
};
