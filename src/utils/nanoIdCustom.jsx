import {customAlphabet} from "nanoid"

export function nanoIdNumbers(value){
    const nanoid = customAlphabet('1234567890', 5)
    return nanoid();
}