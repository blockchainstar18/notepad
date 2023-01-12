import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const [items, setItems] = useState([])
    const [flag, setFlag] = useState(false)

    const handletxt = () => {
        document.getElementsByTagName('textarea')[0].value.split('\n').forEach((txt) => {
            if (txt != '') {
                let body = { txt }
                axios.post('http://localhost:7000/', body).then((res) => {
                    if (!res.data.item) {
                        const id = makeid(10)
                        body = { txt, id }
                        axios.patch('http://localhost:7000/', body).then((res) => {
                            // console.log(res.data)
                            setFlag(!flag)
                        })
                    }
                    else {
                        console.log('duplicate error')
                    }
                })
            }
        })

    }

    const deleteItem = (id) => {
        // let body = { id }
        axios.delete('http://localhost:7000/', { params: { data: id } }).then((res) => {
            if (res.data == true) {
                setFlag(!flag)
            }
        })
    }

    const deleteAllLink = () => {
        // let body = { id }
        axios.delete('http://localhost:7000/').then((res) => {
            if (res.data == true) {
                setFlag(!flag)
            }
        })
    }

    const copyLink = (id) => {
        // alert(window.location.host)
        navigator.clipboard.writeText(window.location.host + '/' + id).then(() => {
            toast('Copied to clipboard')
        })
    }

    const copyAllLink = () => {
        var links = ''
        items.forEach((it) => {
            links += window.location.host + '/' + it.id
            links += '\n'
        })
        navigator.clipboard.writeText(links).then(() => {
            toast('Copied to clipboard')
        })
    }

    useEffect(() => {
        // setInterval(() => {
        //     setFlag(!flag)
        // }, 10000);
        axios.get("http://localhost:7000/").then((res) => {
            setItems(res.data.items)
        })
    }, [flag])
    return (
        <div className='container'>
            <div className='insert'>
                <div className='title'>INPUT</div>
                <textarea className='txtarea'></textarea>
                <div className='btn' onClick={() => handletxt()}>Confirm</div>
            </div>
            <div className='insert'>
                <div className='title'>Shared links</div>
                <ToastContainer />
                <div className='controlarea'>
                    {

                        items.map((it) => {

                            return (
                                <div className='item' key={it.id}>
                                    <div className='no' onClick={() => copyLink(it.id)}>Copy</div>
                                    <div className='id'><Link to={it.id}>{it.id}</Link></div>
                                    <div className='txt'>{it.txt}</div>
                                    {/* <div className='time'>{it.time}</div> */}
                                    <div className='delbtn' onClick={() => deleteItem(it.id)}>Delete</div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className='row'>
                    <div className='btn' onClick={() => copyAllLink()}>Copy all links</div>
                    <div className='btn' onClick={() => deleteAllLink()}>Delete all links</div>
                </div>
            </div>

        </div>
    );

}

export default Home;