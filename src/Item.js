import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Item() {
    let { id } = useParams();
    const [txt, setTxt] = useState('')
    useEffect(() => {

        axios.get('http://localhost:7000/', { params: { data: id } }).then((res) => {

            if (!res.data.item) {
                setTxt('No such link! Please check the link again.')
            }
            else
                setTxt(res.data.item.txt)
        })
    }, [])
    return (
        <div className="itemcontent">
            <h3>{txt}</h3>
        </div>
    );
}

export default Item;