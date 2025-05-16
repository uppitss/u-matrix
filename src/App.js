import React, {useEffect, useState} from 'react';
import {Button, Stack, Heading } from "@chakra-ui/react";
import MatrixTabs from "./features/matrix/components/MatrixTabs";

function App() {
    useEffect(() => {
        // Пример использования Electron API
        // if (window.electronAPI) {
        //     window.electronAPI.doSomething();
        // }
    }, []);

    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);

    // Чтение файла
    const readFile = async (filePath) => {
        try {
            const content = await window.electronAPI.readFile(filePath);
            setFileContent(content);
            setError(null);
        } catch (err) {
            setError(`Error reading file: ${err.message}`);
        }
    };

    // Сохранение файла
    const saveFile = async (filePath, content) => {
        try {
            await window.electronAPI.writeFile(filePath, content);
            setError(null);
            return true;
        } catch (err) {
            setError(`Error saving file: ${err.message}`);
            return false;
        }
    };


    return (
        <MatrixTabs></MatrixTabs>
        // <Stack direction={"column"}>
        //     <Heading as={"h3"}>Hello Electron + React3!</Heading>
        //     <div>
        //         Кликов: {count}
        //     </div>
        //
        //     <Button colorScheme='blue' onClick={() => {
        //         setCount(count + 1);
        //     }}>Кликер чакры</Button>
        //
        //     <Button onClick={() => {
        //         saveFile("ttt.txt", count.toString());
        //     }}>Сохранить в файл
        //     </Button>
        // </Stack>
    );
}

export default App;