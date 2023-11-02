class Queue{

    //private attr with #
    #items = [];

    enqueue(item){
        this.#items.push(item);
    }

    dequeue(){
        return this.#items.shift();
    }

    isEmpty(){
        return this.#items.length === 0;
    }

    
}

const promiseWaiting = (message, timeout) => {
    // closure
    // return a function that most be execute with()
    return () => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(message);
            }, timeout);
        });
    }
}

const fetchWaiting = function(url){
    return async ()=> {
        // esperar un segundo antes de continuar
        await new Promise(r => setTimeout(r, 1000));
        return fetch(url).then(res => res.json());
    }
}

const queue = new Queue();
queue.enqueue([promiseWaiting('promise 1', 2000), (data) => console.log(data)]);
queue.enqueue([promiseWaiting('promise 2', 2000), (data) => console.log(data)]);
queue.enqueue([
    //random data
    fetchWaiting('https://jsonplaceholder.typicode.com/todos/1'),
    (data) => document.getElementById('content').innerHTML += `<p>${data.title}</p>`
]);
queue.enqueue([
    fetchWaiting('https://jsonplaceholder.typicode.com/todos/2'),
    (data) => document.getElementById('content').innerHTML += `<p>${data.title}</p>`
]);

async function run(){
    while(!queue.isEmpty()){
        const res = queue.dequeue();
        const data = await res[0]();
        res[1](data);
    }
}

run();

// const promise = new Promise((res, rej) => {
//     setTimeout(() => {
//         res('promesa 1');
//     }, 4000);
// });

// promise.then(res => console.log(res));

// IIFE way
// (async () => {
//     console.log(await promise);
// })();