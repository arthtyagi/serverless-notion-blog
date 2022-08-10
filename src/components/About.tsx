import React from "react";
import { Buffer } from 'buffer';
import Parser from 'html-react-parser';

export default function About({ghdata}) {
    const decoded = Buffer.from(ghdata, 'base64').toString('ascii');
    return (
            <body>
                <div>
                <section className="about">
                I make and break stuff.
                <br></br>
                I produce psychedelic music.
                <br></br>
                I tend to flirt with minimal and stoic -ism.
                </section>
                <hr></hr>
                {Parser(decoded)}
                </div>
            </body>
    )
}
