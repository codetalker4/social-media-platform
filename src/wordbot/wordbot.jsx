import React from "react";
import { useEffect } from "react";
import { useState } from "react"
import './wordbot.css';

const Wordbot = () => {
    const [mean, setMean] = useState('')
    const [word, setWord] = useState('')
    const [validate, setValidate] = useState(false)
    const [data, setData] = useState(false)
    const [gameword, setgameword] = useState(false)
    const [toggle, settoggle] = useState(false)
    var gword

    const clk = async (e) => {
        await fetch('https://sma13.herokuapp.com/wbot', {
            method:'POST',
            mode:'no-cors',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({word:word,mean:e.target.innerText})
        })
    }
    const clk1 = async () => {
        const res = await fetch('https://sma13.herokuapp.com/wbot/test', {mode:'no-cors'})
        const data = JSON.parse(await res.json())
        setgameword(data)
    }

    return(
        <div>
            <button onClick={() => settoggle(!toggle)} className="toggle"  >{toggle ? 'PLAY GAME' : 'SEARCH MEANING'}</button>
            {toggle ?
            <><h2>Enter the word to search it's meaning</h2>
            <input type="text" placeholder="Enter a word ..." name="word" id="word" autoComplete="false" onChange = { e => {
                setWord(e.target.value)
                if(word!=='') {
                    setValidate(true)
                } else {
                    setValidate(false)
                }
            }} />
            <button type="submit" className="search" onClick={async () => {
                if(validate) {
                    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                    const info = await res.json()
                    setData(info)
                }     
            }}>Search</button>
            <h4>{validate ? '' : 'The search field can\'t be empty'}</h4>
            <div className="container">
                {data ? data.map(data => {
                    return(
                        data.meanings.map(meaning => {
                            return(
                                <div className="mean-container"><h4>{meaning.partOfSpeech}</h4>
                                    {meaning.definitions.map(def => {
                                        return(<h5 onClick={clk}>{def.definition}</h5>)
                                    })}
                                </div>
                            )
                        })
                    )
                }) : <h5>No Data</h5>}
                
                
            </div></> :
            <div>
                <div className="game-head">GUESS THE MEANING</div>
                <div className="select-word">
                    <button className="select" onClick={clk1}>select</button>
                    {gameword ? <div className="word">{gameword.word.word}</div> : 'press select to choose random word'}

                </div>
                <div>
                    <h3 className="wboth3" onClick={() => setMean(!mean)}>click here to {!mean ? 'see' : 'hide'} the meaning</h3>
                    {mean ? <div className="wmean">{gameword.word.mean}</div> : ''}
                </div>
            </div>}
        </div>
    )
}

export default Wordbot;