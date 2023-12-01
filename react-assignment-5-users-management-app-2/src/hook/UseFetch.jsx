/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

function UseFetch(url) {
    // Task 1: complete this custom hook
    // step1: create 3 states: data, isLoading, error
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState([])
    // step2: fetch data & handle error

    useEffect(() => {
        setTimeout(
            () => {
                fetch(url)
                    .then(res => {
                        if (!res.ok) {
                            throw Error("Something wrong......")
                        }
                        return res.json()
                    })
                    .then(data => {
                        setData(data)
                        setIsLoading(false)
                    })
                    .catch(e => {
                        setIsLoading(false)
                        setError(e.message)
                    })
            }, 2000)

    }, [url])

    // useEffect(() => {
    //     setTimeout(() => {
    //         fetch(url)
    //             .then(res => {
    //                 if (!res.ok) {
    //                     throw Error("data is Not Found")
    //                 } else {
    //                     return res.json()
    //                 }
    //             })
    //             .then(data => {
    //                 setIsLoading(false);
    //                 setData(data);
    //                 setError(null);
    //             })
    //             .catch(error => {
    //                 setIsLoading(false);
    //                 setError(error.message);
    //                 setData(null);
    //             })
    //     }, 2000)
    // }, [url]);
    console.log(error);
    // step3: return 3 states
    return { isLoading, error, data }
}


export default UseFetch