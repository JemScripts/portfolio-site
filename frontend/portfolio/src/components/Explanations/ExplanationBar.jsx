import { useState } from "react";

export default function ExplanationBar( {question, explanation} ) {
    const [hideText, setHideText] = useState(true);

    const handleClick = () => {
        setHideText(!hideText); 
    }

    return (
        <div className="mx-auto mt-8 max-w-5xl rounded-l bg-white p-4 shadow-sm cursor-pointer" onClick={handleClick}>
            <div className="flex items-center justify-between">
                <h2 className="mb-3 text-xl font-semibold">
                    {question}
                </h2>

                <span className="text-2xl font-bold">
                    {hideText ? "+" : "-"}
                </span>
            </div>
            {!hideText && (
            <p className="text-slate-600 leading-relaxed">
                {explanation}
            </p>
            )}
        </div>
    );
}