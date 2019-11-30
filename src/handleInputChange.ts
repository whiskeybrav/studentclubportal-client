import { ChangeEvent } from "react";

export default function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const target = event.target;
    const value: string = target.value;
    const name: string = target.name;

    // Hopefully i'll come back and fix this at some point, but for now, 
    // @ts-ignore
    this.setState({
        [name]: value
    });
}