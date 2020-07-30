const updateUI = async() => {
    const request = await fetch('http://localhost:8081/getData');
    try {
        const allData = await (request.json());
        let analysis = document.querySelector('#results p')
        if (analysis===null) {
            analysis = document.createElement('p');
        } 
        analysis.innerText = `The text is ${allData.subjectivity} and ${allData.tone}.`
        console.log(analysis.innerText);
        document.querySelector('#results').appendChild(analysis);
    } catch (error){
        console.log('error', error);
    }
}
export { updateUI}