//1.useState untuk update data
import React, {useState, useEffect} from 'react';
//2.import axios untuk interaksi dg API
import axios from "axios";
import { useNavigate,useParams } from 'react-router-dom';


const EditUser = () => {
    //3.membuat state baru
    const [nama, setNama] = useState("");
    const [alamat_domisili, setAlamatDomisili] = useState("");
    const [kamar, setKamar] = useState("Bawah");
    const [jumlah_orang, setJumlahOrang] = useState("");
    const [status_perkawinan, setStatusPerkawinan] = useState("Menikah");
    const [jenis_kelamin, setJenisKelamin] = useState("Perempuan");
    const [status_tinggal, setStatusTinggal] = useState("Aktif");
    const [kategori_orang, setKategoriOrang] = useState("Dewasa");
    const [alamat_asal, setAlamatAsal] = useState("");
    const [agama, setAgama] = useState("Islam");
    const [no_hp, setNohp] = useState("");
    const [kepemilikan, setKepemilikan] = useState("Pemilik");
    const [nama_pemilik, setNamaPemilik] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        getUserById();
    },[]);

    const updateUser = async (e) =>{
        e.preventDefault();
        try{
            await axios.patch(`http://localhost:5000/users/${id}`,{
                nama,
                alamat_domisili,
                kamar,
                jumlah_orang,
                status_perkawinan,
                jenis_kelamin,
                status_tinggal,
                kategori_orang,
                alamat_asal,
                agama,
                no_hp,
                kepemilikan,
                nama_pemilik
            });
            navigate("/");
        } catch (error) {
            console.log(error);

        }
    }

    const getUserById = async () => {
        //untuk mengambil id dr parameter bisa menggunakan useParams
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setNama(response.data.nama);
        setAlamatDomisili(response.data.alamat_domisili);
        setKamar(response.data.kamar);
        setJumlahOrang(response.data.jumlah_orang);
        setStatusPerkawinan(response.data.status_perkawinan);
        setJenisKelamin(response.data.jenis_kelamin);
        setStatusTinggal(response.data.status_tinggal);
        setKategoriOrang(response.data.kategori_orang);
        setAlamatAsal(response.data.alamat_asal);
        setAgama(response.data.agama);
        setNohp(response.data.no_hp);
        setKepemilikan(response.data.kepemilikan);
        setNamaPemilik(response.data.nama_pemilik);
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateUser}>
                    <div className="field">
                        <label className="label">Nama</label>
                        <div className="control">
                            <input type="text" className="input" value={nama} onChange={(e) => setNama(e.target.value)} placeholder='Nama' />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Alamat_Dom</label>
                        <div className="control">
                            <input type="text" className="input" value={alamat_domisili} onChange={(e) => setAlamatDomisili(e.target.value)} placeholder='Domisili' />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Kamar</label>
                        <div className="control">
                           <div className="select is-fullwidth">
                                <select value={kamar} onChange={(e) => setKamar(e.target.value)}>
                                    <option value="Bawah">Bawah</option>
                                    <option value="Atas Toilet">Atas Toilet</option>
                                    <option value="Atas Tangga">Atas Tangga</option>
                                </select>
                           </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Jumlah Orang</label>
                        <div className="control">
                            <input type="text" className="input" value={jumlah_orang} onChange={(e) => setJumlahOrang(e.target.value)} placeholder='Jumlah Orang' />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Status Kawin</label>
                        <div className="control">
                           <div className="select is-fullwidth">
                                <select value={status_perkawinan} onChange={(e) => setStatusPerkawinan(e.target.value)}>
                                    <option value="Menikah">Menikah</option>
                                    <option value="Sendiri">Sendiri</option>
                                    <option value="Janda">Janda</option>
                                    <option value="Duda">Duda</option>
                                </select>
                           </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">J. Kelamin</label>
                        <div className="control">
                           <div className="select is-fullwidth">
                                <select value={jenis_kelamin} onChange={(e) => setJenisKelamin(e.target.value)}>
                                    <option value="Laki-Laki">Laki-Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                           </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Status Tinggal</label>
                        <div className="control">
                           <div className="select is-fullwidth">
                                <select value={status_tinggal} onChange={(e) => setStatusTinggal(e.target.value)}>
                                    <option value="Aktif">Aktif</option>
                                    <option value="Pindah">Pindah</option>
                                </select>
                           </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Kategori Orang</label>
                        <div className="control">
                           <div className="select is-fullwidth">
                                <select value={kategori_orang} onChange={(e) => setKategoriOrang(e.target.value)}>
                                    <option value="Dewasa">Dewasa</option>
                                    <option value="Anak-Anak">Anak_Anak</option>
                                </select>
                           </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Alamat Asal</label>
                        <div className="control">
                            <input type="text" className="input" value={alamat_asal} onChange={(e) => setAlamatAsal(e.target.value)} placeholder='Alamat Asal' />
                        </div>
                    </div>


                    <div className="field">
                        <label className="label">Agama</label>
                        <div className="control">
                           <div className="select is-fullwidth">
                                <select value={agama} onChange={(e) => setAgama(e.target.value)}>
                                    <option value="Islam">Islam</option>
                                    <option value="Kristen">Kristen</option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Budha">Budha</option>
                                    <option value="Katholik">Katholik</option>
                                </select>
                           </div>
                        </div>
                    </div>


                    <div className="field">
                        <label className="label">No Hp</label>
                        <div className="control">
                            <input type="text" className="input" value={no_hp} onChange={(e) => setNohp(e.target.value)} placeholder='No Hp' />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Kepemilikan</label>
                        <div className="control">
                           <div className="select is-fullwidth">
                                <select value={kepemilikan} onChange={(e) => setKepemilikan(e.target.value)}>
                                    <option value="Pemilik">Pemilik</option>
                                    <option value="Pengekos">Pengekos</option>
                                </select>
                           </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Nama Pemilik</label>
                        <div className="control">
                            <input type="text" className="input" value={nama_pemilik} onChange={(e) => setNamaPemilik(e.target.value)} placeholder='Nama Pemilik' />
                        </div>
                    </div>



                    <div className="field">
                       <button type='submit' className='button is-success'>Update</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditUser


