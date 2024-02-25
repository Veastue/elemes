"use client";

import ReactConfetti from "react-confetti";

import { useConfettiStore } from "@/hooks/use-confetti-store";

export const ConfettiProvider = () => {
    const confetti = useConfettiStore();

    if(!confetti.isOpen) return null;

    return (
        <ReactConfetti 
            className="pointer-events-none relative z-[500] w-screen h-screen"
            numberOfPieces={300}
            recycle={false}
            onConfettiComplete={() => {
                confetti.onClose();
            }}
        />
    )
}