import React, {useEffect, useState} from 'react';

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
        <div>
            <h1>Hello Electron + React3!</h1>
            <div>
                Кликов: {count}
            </div>
            <div>
                <button value={"Кликер"} onClick={() => {
                    setCount(count + 1);
                }}>Кликер2
                </button>
            </div>
            <div>
                <p>
                    <button value={"Сохранить в файл"} onClick={() => {
                        saveFile("ttt.txt", count.toString());
                    }}>Сохранить в файл
                    </button>
                </p>
            </div>
        </div>
    );
}

export default App;