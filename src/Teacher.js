// 1. Import Area
import { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";

// import './App.css';

// 2. Definition Area
function Teacher() {
    // 2.1 Hooks Area

    // const [variable, setVariable] = useState(initialValue)
    const [teachers, setTeachers] = useState([
        {
            id: 1,
            name: 'Amit',
            createdAt: '121'
        },
        {
            id: 2,
            name: 'Roman',
            createdAt: '212'
        }
    ])
    const [payload, setPayload] = useState({
        "data": {
            "name": "Teacher 3"
        }
    });
    const [teacherName, setTeacherName] = useState('');
    // useEffect is used for page load
    // I want to call the api after the page load
    // useEffect();
    // cbfn = Callback function ()=>{}
    // arr = Array []
    useEffect(() => {
        // What you write here will be executed after the pageload/component render
        fetch(`http://localhost:1337/api/teachers`)
            .then((res) => {
                // This make res JSON readable
                return res.json()
            })
            .then((data) => {
                console.log(data);
                let newaoo = data.data.map((cv, idx, arr) => {
                    return {
                        id: cv.id,
                        name: cv.attributes.name,
                        createdAt: cv.attributes.createdAt
                    }
                });
                setTeachers(newaoo);
            })
            .catch();

    }, []);
    // amit(actualArg1, actualArg2, ...);
    // Every Hook is a function

    // 2.2 Function definition area
    let sendData = () => {
        // alert('OKOKOK');
        fetch(`http://localhost:1337/api/teachers`, {
            "method": "POST",
            "headers": {
                //P:V
                "Content-Type": "applicaton/json"
            },
            "body": JSON.stringify(payload)
        }).then((res) => {
            // I want to convert the response into json readable
            return res.json();
        }).then((data) => {
            console.log(data);
            if (data) {
                alert("Teacher Created Successfully");
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    let changeValue = (event) => {
        console.log(event.target.value);
        setTeacherName(event.target.value);
        console.log('HOOK teacherName', teacherName);

        setPayload({
            ...payload,
            data: {
                name: document.querySelector('input#teachername').value
            }
        });
    }

    let deleteTeacher = (e) => {
            document.getElementById("loader").innerHTML = `<div className="d-flex justify-content-center">
                                                                <div NclassName="spinner-border" role="status">
                                                                    <span NclassName="visually-hidden">Loading...</span>
                                                                </div>
                                                            </div>`

        let x = e.target.closest('tr');
        console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML);
        let delid = e.target.closest('tr').querySelector('td:first-child').innerHTML
        let ans = window.confirm("Do you really want to delete");
        console.log(typeof ans);
        if (ans === true) {
            // Call the DELETE REST API
            fetch(`http://localhost:1337/api/teachers/${delid}`, {
                method: "DELETE"
            })

                .then((res) => {
                    // This json() function make the incoming data json readable 
                    res.json();
                })
                .then((data) => {
                    x.remove();
                    console.log(data);
                    document.getElementById("loader").innerHTML = '';
                    window.alert('Deleted Successfully')
                })
                .catch((err) => {

                });
        }
        else {
            console.log('Not OK');
        }
    }
    // 2.3 Return Statement
    return (
        <>
            <div id="loader">

            </div>
            <div NclassName="container">
                <h1>Create Teacher</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="teachername" className="form-label">Teacher Name</label>
                        <input type="text" className="form-control" id="teachername" name="name" onKeyUp={(e) => { changeValue(e) }} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => { sendData() }}>Submit</button>
                </form>
                <br />
                <hr />
                <hr />
                <br />
                <table NclassName="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">CreateAt</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teachers.map((cv, idx, arr) => {
                                return <tr>
                                    <td>{cv.id}</td>
                                    <td>{cv.name}</td>
                                    <td>{cv.createdAt}</td>
                                    <td>
                                        <button className='btn btn-success btn-sm'>View</button>
                                        <button className='btn btn-primary btn-sm'>Edit</button>
                                        <button className='btn btn-danger btn-sm' onClick={(e) => { deleteTeacher(e) }}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

// 3. Export Area
export default Teacher;
