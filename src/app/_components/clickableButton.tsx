'use client'

interface ClientButtonProps {
    text: string;
    func: () => void;
}

export default function ClientButton({ text, func }: ClientButtonProps){

    return (
        <button onClick={func}>
            {text}{' my brother'}
        </button>
    )
}