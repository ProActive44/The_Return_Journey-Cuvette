import React from 'react';
import { useSelector } from 'react-redux';

const LeaderBoard = () => {

    const AllUsers = useSelector((store)=>store.AllUsers)
    console.log(AllUsers)
    return (
        <div>
            
        </div>
    );
};

export default LeaderBoard;