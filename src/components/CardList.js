import '../styles/CardList.css';
import Card from './Card';

function CardList({data}) {
    // console.log(data.length);
    const daily = data.map((weather,idx) => idx > 0 ? <Card key={idx} weather={weather}/> : <></>)
    return (
        <>
          {daily}
        </>
    )
}

export default CardList;