
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

export function getGLTFs() {
    return new Promise((resolve, reject) => {
        fetch('/gltfs')
            .then(async (response) => {
                resolve(await response.json());
            })
            .catch((err) => {
                resolve([]);
            })
    })
}

export function getIFCs() {
    return new Promise((resolve, reject) => {
        fetch('/ifcs')
            .then(async (response) => {
                resolve(await response.json());
            })
            .catch((err) => {
                resolve([]);
            })
    })
}