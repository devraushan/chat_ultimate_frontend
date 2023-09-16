export default function buffToImg(buff){
    const buffer = Buffer.from(buff)
    const file = new File([buffer], "img.jpg", { type: "image/jpeg" })
    return file
}