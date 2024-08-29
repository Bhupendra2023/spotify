
import React, { useEffect, useRef } from "react";

export default function Modal({ title, open, close, children,  bgColor }) {

    const modalRef = useRef(null);
    useEffect(() => {
        if (open) {
            document.body.classList.add("overflow-hidden");
            modalRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [open]);

    return (
        <div onClick={close} className={` fixed z-[10000] m-auto inset-0 flex justify-center items-center transition-colors duration-300 ${!!open ? "visible bg-black/20" : "invisible bg-transparent"}`}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: bgColor }} className={` md:rounded-lg shadow-xl fixed sm:bottom-0  sm:w-full sm:rounded-t-xl sm:pt-4 transform transition-all duration-500 ${!!open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
                <div className="flex justify-between items-center sticky mb-2 sm:w-full px-[20px] md:p-[10px] lg:p-[20px] ">
                    <h1 className="text-heading font-manrope font-bold leading-[21px] text-xl md:text-2xl">
                        {title}
                    </h1>
                    <div className="cursor-pointer mr-2" onClick={close}>
                        <div className="min-h-[22px] min-w-[22px] ">
                            <img
                                className="invert brightness-0"
                                src={`https://cdn.visionias.in/studentEdge/images/cross.svg`}
                                alt="crossIcon"
                            />
                        </div>
                    </div>
                </div>
                <div ref={modalRef} className="max-h-[80vh] h-full midScrollbar overflow-y-auto sm:w-full px-[20px] md:pb-[20px]  sm:pb-2 md:px-[30px]">
                    {children}
                </div>
            </div>
        </div>
    );
}
