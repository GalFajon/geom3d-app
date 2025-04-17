import { useEffect } from 'react';

const useScripts = (urls, callback) => {
    useEffect(() => {
        let scripts = [];

        async function load() {
            for (let url of urls) {
                const script = document.createElement('script');

                script.src = url;

                document.head.appendChild(script);
                scripts.push(script);

                await new Promise((resolve, reject) => { script.onload = () => { resolve() } });
            }

            if (callback) callback();
        }

        load();

        return () => {
            for (let script of scripts) {
                document.head.removeChild(script);
            }
        }
    }, []);
};

export { useScripts };