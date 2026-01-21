// import { Button } from "flyonui";
import { useCallback } from "react";
import { Button } from "@heroui/react";
import { router } from "@inertiajs/react";

export default function Home() {

    const handleClick = useCallback(() => {
        router.get('/booking');
    },[router])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
            <p>This is the home page content.</p>
            <div className="flex gap-2">
                <Button onPress={handleClick} variant="flat" className="text-blue-500 underline">Go to Booking</Button>
                <Button variant="flat">Click Me</Button>
            </div>
        </div>
    )
}
