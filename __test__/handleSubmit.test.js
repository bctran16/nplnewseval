import { handleSubmit } from "../src/client/js/formHandler"
import { postData} from "../src/client/js/postData"
import { updateUI} from "../src/client/js/updateUI"

describe("Testing the submit functionality", () => {
    
    test("Testing the handleSubmit() function", () => {
        expect(handleSubmit).toBeDefined();
    })
})