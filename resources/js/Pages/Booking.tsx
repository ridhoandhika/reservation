import { useCallback } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@heroui/react";

export default function Booking() {

    const handleClick = useCallback(() => {
        router.get('/');
    }, [router])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Booking Page</h1>
            <p>This is the booking page content.</p>
            <Button onPress={handleClick} variant="flat" className="text-blue-500 underline">Go to Home</Button>
        </div>
    )
}