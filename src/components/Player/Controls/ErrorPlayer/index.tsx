

export function ErrorPlayer({error}: {error: Error}) {

    return(
        <>
            <h1>Player Error</h1>
            <p>Details: {error.message}</p>
        </>
    )
}