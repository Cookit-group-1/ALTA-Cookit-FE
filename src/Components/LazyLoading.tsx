import React,{FC} from 'react'
import { DotLoader } from "react-spinners";

interface LoadingDotwaveProps {
    color: string;
    size: number;
}


const LazyLoading:FC<LoadingDotwaveProps> = ({color,size}) => {
    return (
        <div className="flex items-center justify-center ">
            <DotLoader color={color} size={size} />
        </div>
    )
}

export default LazyLoading
