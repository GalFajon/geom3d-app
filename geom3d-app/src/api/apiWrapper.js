
export function getPointclouds() {
    return new Promise((resolve, reject) => {
        fetch('/pointclouds')
            .then(async (response) => {
                resolve(await response.json());
            })
            .catch((err) => {
                resolve([]);
            })
    })
}