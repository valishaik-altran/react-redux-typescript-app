import React, { useEffect, useState } from "react";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

function GitReposPage() {
    const [repos, setRepos] = useState<any[]>([])
    const [name, setName] = useState("facebook")
    useEffect(() => {
        fetchRepoData();
    }, []);

    const fetchRepoData = async () => {
        const response = await axios.get('https://api.github.com/users/' + name + '/repos');
        setRepos(response.data);
    }
    return (
        <div className="auto-height" style={{ marginLeft: "100px" }}>
            <TextField required id="standard-required" label="Required" value={name} onChange={e => setName(e.target.value)} />
            {/* <input type="text" value={name} onChange={e => setName(e.target.value)} /> */}
            <button style={{ color: 'white', background: 'teal' }} className="join-now btn" onClick={fetchRepoData}>Get Repos</button> <small>(try angular, vue, jquery etc.)</small>
            <h2>
                This is the real time data of {name} projects in GIT
            </h2>
            {repos.length > 0 ?
                <table className="repos-table">
                    <thead>
                        <tr>
                            <th >S.NO</th>
                            <th >Name</th>
                            {/* <th >full Name</th> */}
                            <th >Description</th>
                            <th >HTML URL</th>
                            {/* <th>User Email</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {repos.map((person, index) =>
                            <tr>
                                <td >{index + 1}</td>
                                <td >{person.name}</td>
                                {/* <td >{person.full_name}</td> */}
                                <td >{person.description}</td>
                                <td >
                                    <a target="_blank" href={person.html_url}>{person.html_url}</a>
                                </td>
                                {/* <td>{person.email}</td> */}
                            </tr>
                        )}
                    </tbody>
                </table> : <p> Loading Repos... </p>}
        </div>
    );
}

export { GitReposPage };
