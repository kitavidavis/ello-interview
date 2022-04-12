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

        return main ? data.book.pages.map((obj, index) => {
            let chunk = obj.tokens;
            
            let chunk2 = [];
            chunk.map((item) => {
                let val = item.value;
                chunk2.push(val);
            });
     
            return <div key={index}>{chunk2.map((word, id) => {
                return (<span  id={id} onClick={() => {handleWord(word)}} >{word + " "}</span>)
            })}</div>
        }) : <span>{word_}</span>
}

export default TokensView;