import React from "react";

const fsys = () => {
    // var abc = {
    //     "key": "value",
    //     "number" : 100
    // }
    var theFile;
    const btnfn = (e) => {
        const fileReader = new FileReader();
        e.preventDefault();
       
        fileReader.onload = async (e) => {
            const chunkSize = 2000;
            const chunkCount = e.target.result.byteLength/chunkSize;
            const fileName = theFile.name

            for(let chunkId = 0; chunkId < chunkCount + 1; chunkId++) {
                const chunk = e.target.result.slice(chunkId * chunkSize, chunkId * chunkSize + chunkSize )
                // alert(chunk.toString())
                await fetch('http://localhost:4000/upload', {
                    method: "POST",
                    headers: {
                        "content-type": "application/octet-stream",
                        "content-length": chunk.length,
                        "file-name": fileName
                    },
                    body:{ 
                        chunk:chunk,
                        hello:'hello'
                        // fname: theFile.name,
                    }
                })
                
            }
        }
        // fetch('/upload1', {
        //     "method": "POST",
        //     "body": JSON.stringify(abc)
        // })

        
        
        fileReader.readAsArrayBuffer(theFile);
    }
    const file = (e) => {
        theFile = e.target.files[0]
        console.log(theFile)
       
    }


    return (
        <div>
            <label htmlFor="file">Upload file here : </label>
            <input type="file" name="file" id="file" onChange={file} />
            <button type="submit" onClick={btnfn}>Upload</button>
        </div>
    )
}

export default fsys