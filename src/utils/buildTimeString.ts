
export default function buildTimeString(time: number){

  const minutes = (time - (time % 60)) / 60

  const seconds = Math.round(time % 60)


  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0'+ seconds : seconds}`
}