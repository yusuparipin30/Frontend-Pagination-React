import React, {useState, useEffect} from "react";
import axios from "axios";
//7.untuk membuat paginate
import ReactPaginate from "react-paginate";

const UserList = () => {
    //1.mrmbuat state baru
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState(""); 

    //4.menjalankan method getUsers ke dalam useEffect
    useEffect(() =>{
        getUsers();
    },[page,keyword]);

    //2.membuat sebuah method yang beerfungsi untuk mengambil API
    const getUsers = async() => {
        const response = await axios.get(  
            `http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        //3.memasukan responnya di dalam state. mengambil dri backend
        setUsers(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
    };

    //9. change page
    const changePage = ({selected}) => {
        setPage(selected);
        //15. 
        if(selected === 2){
            setMsg("Jika tidak menemukan data yang anda cari,silakan cari data dengan kata kunci yang lebih spesifik di pencarian");
        } else {
            setMsg("");
        }
    };

    //12.untuk search data
    const searchData = (e) => {
        e.preventDefault();
        setPage(0);
        setKeyword(query);
    };

    return(
        <div className="container mt-5">
            <div className="columns">
                <div className="column is-centered">
                    {/*10.search data*/}
                    <form onSubmit={searchData}>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                 {/*11.search data*/}
                                <input
                                 type="text"
                                  className="input"
                                  value={query}
                                  onChange={(e) => setQuery(e.target.value)}
                                   placeholder='Find Something Here...'/>
                            </div>
                            <div className="control">
                                <button type="submit" className="button is-info">Search</button>
                            </div>
                        </div>
                    </form>
                    <table className="table is-striped is-bordered is-fullwidth mt-2">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*5. looping untuk menampilkan data*/}
                            {users.map((user) => (
                                 <tr key={user.id}>
                                 <td>{user.id}</td>
                                 <td>{user.name}</td>
                                 <td>{user.email}</td>
                                 <td>{user.gender}</td>
                             </tr>
                            ))}
                        </tbody>
                    </table>
                    {/*6.menampilka total rows, rows di ambil dari statenya, dan juga pagenya*/}
                    {/*page di mulai dr 1 dan total pages nya ngambil dari state pages nya*/}
                    {/*rows? artinya jika tidak ada rows maka akan render page+1 dan jika tidak ada data maka render 0*/}
                    <p>
                        Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
                    </p>
                    {/*16.menampilkan pesan*/}
                    <p className="has-text-centered has-text-danger">{msg}</p>
                 {/*8.membuat pagination */} {/*13.key rows adalah untuk mereset pagination apabila da prubahan */}
                 {/*14 pada pageCount berfungsi untuk membatasi jumlah paginationnya seting 5*/}
                    <nav className="pagination is-centered" key={rows} role="navigation" aria-label="pagination">
        
                        <ReactPaginate
                         previousLabel={"< Prev"}
                         nextLabel={"Next >"}
                         pageCount={Math.min(3,pages)}
                         onPageChange={changePage}
                         containerClassName={"pagination-list"}
                         pageLinkClassName={"pagination-link"}
                         previousLinkClassName={"pagination-previous"}
                         nextLinkClassName={"pagination-next"}
                         activeLinkClassName={"pagination-link is-current"}
                         disabledLinkClassName={"pagination-link is-disabled"}/>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default UserList