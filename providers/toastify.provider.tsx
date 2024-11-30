"use client"
import { ReactNode } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const ToastProvider : React.FC<{children : ReactNode}> = ({children})=>{
    return <>
    {children}
    <ToastContainer/>
    </>
}