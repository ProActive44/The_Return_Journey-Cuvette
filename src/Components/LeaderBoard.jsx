import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

const LeaderBoard = () => {

    const AllUsers = useSelector((store)=>store.AllUsers)
    console.log(AllUsers)
    return (
        <div>
            {
                AllUsers?.map((ele, idx)=>{
                    return (
                        <Box key={idx}>
                            
                        </Box>
                    )
                })
            }
        </div>
    );
};

export default LeaderBoard;