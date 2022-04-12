import React from "react";
import { useQuery, gql } from "@apollo/client";

const TOKENS = gql`
query{
	book{
    pages{
      tokens{
        value
      }
    }
  }
}
`;

function TokensView(){
    const { data, loading, error} = useQuery(TOKENS);
    const [main, setMain] = React.useState(true);
    const [word_, setWord] = React.useState(null);

    //total page views - derived from count of page contents
    const[count, setCount] = React.useState(10);

    // initial state for first page
    const[index, setIndex] = React.useState(0);

    const handleIndexIncrement = () => {
        let newincrement = index + 1;
        if(newincrement < count){
            setIndex(newincrement);
        }
    }

    const handleIndexDecrement = () => {
        if(index > 0){
            let newincrement = index - 1;

            setIndex(newincrement);
        } 
    }
    const handleWord = (word) => {
        setMain(false);
        setWord(word);
    }
    if(loading){
        return <div>loading</div>
    }

    if(error){
        return <div>{error.message}</div>
    }

    return main ? data.book.pages.map((obj, idx) => {
        if(index === idx){
            let chunk = obj.tokens;
        
            let chunk2 = [];
            chunk.map((item) => {
                let val = item.value;
                chunk2.push(val);
            });
     
            return <div key={index}>{chunk2.map((word, id) => {
                return (<span  id={id} onClick={() => {handleWord(word)}} >{word + " "}</span>)
            })}
                <div style={{flexDirection: 'row', justifyContent:'space-between', marginTop: 30, marginLeft: 20, marginRight: 20}} >
        <span style={{marginRight: 20,}} >
        <button type="button" id={idx + '+'} onClick={() => {handleIndexDecrement()}}>Back</button>
    </span>
        <span>
    <button type="button" id={idx + '-'} onClick={() => {handleIndexIncrement()}}>Next</button>
    </span>
    </div>
            </div>
            
        }
    }) : <span>{word_}</span>

}

export default TokensView;