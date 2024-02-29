

export default function buildDateString (dateString: string,) {

    const date = new Date(dateString)

    return `${date.getFullYear()}`


}