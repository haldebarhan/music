import * as path from "path"
import generateOPT from "./generateOPT"

const appendImages = (images: any, image: File | undefined, formData: FormData): void => {
    for (let index = 0; index < images.length; index++) {
        image = images[index]
        formData.append("fichiers", <string | Blob>image, generateOPT() + image?.name)
    }
}

export default appendImages

