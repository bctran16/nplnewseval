import { postData } from './postData'
import { updateUI } from './updateUI'
function handleSubmit(event) {
    event.preventDefault();
    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    if (formText ==="") {
        alert("Empty input. Try again!")
    }
    else {
        postData('http://localhost:8081/addEntry', {text: formText}).then(() => {
            updateUI();
        });
        console.log("::: Form Submitted :::");
    }
}

export { handleSubmit }
