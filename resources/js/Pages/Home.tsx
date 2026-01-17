// import { Button } from "flyonui";
import React from "react";
import NavbarComponent from "../components/navbar";
import { Button } from "@heroui/react";
import DefaultLayout from "@/layouts/default";

export default function Home() {
    return (
       <DefaultLayout>
        {/* <NavbarComponent /> */}
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
            <Button variant="flat">Click Me</Button>
        </div>
       </DefaultLayout>
    )
}
