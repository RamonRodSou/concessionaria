'use client';
import { Box, Button } from "@mui/material"
import "./style.scss"
import React from "react";

interface Props {
    description?: string;
    show: boolean;
}

export default function ScheduleBtn({ description, show }: Props) {

    const descriptionBtn = description ? description : "AGENDAR EXAMES";

    function handleSchedule() {
        const target = document.getElementById("talkToUs");
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <Box component="div" height={100} className={`box-button ? ${show ? "show" : ""}`} data-aos="fade-up" data-aos-duration="1500">
            <Button
                variant="contained"
                className="button"
                onClick={handleSchedule}
            >
                {descriptionBtn}
            </Button>
        </Box >
    )
}