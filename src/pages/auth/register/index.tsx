import { FaEyeSlash } from "react-icons/fa6"
import InputForm from "../../../components/elemets/input/InputForm"
import { logo } from "../../../image"
import { IoEye } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"
import ButtonPrimary from "../../../components/elemets/buttonPrimary"
import { useState } from "react"
import { register } from "../../../service/auth"

const Register = () => {
    const [showPassword, setShowPassword] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [typePassword, setTypePassword] = useState("password")
    const [errorMsg, setErrorMsg] = useState(" ")
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        address: '',
        role: 'user'
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, } = e.target;
        setForm({ ...form, [name]: value });

        const updatedValues = {
            ...form,
            [name]: value,
        };

        if (updatedValues.email !== "" && updatedValues.password !== "" && (updatedValues.email.includes('@gmail.com') || updatedValues.email.includes('@test.com'))) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

        const nameRegex = /^[A-Za-z\s\-\_\'\.\,\&\(\)]{1,100}$/; //validasi nama
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/ //validasi email
        const passwordRegex = /^[A-Za-z0-9]+$/ //validasi password
        if (!nameRegex.test(form.username)) {
            setErrorMsg('*Masukan nama yang valid')
            setDisabled(false);
            setDisabled(true);
        } else if (!emailRegex.test(form.email)) {
            setDisabled(true);
            setErrorMsg('*Masukan email yang valid')
        } else if (!passwordRegex.test(form.password) || form.password.length < 8) {
            setDisabled(true);
            setErrorMsg('*password harus 8 karakter atau lebih')
        } else {
            setErrorMsg('')
        }
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
        if (typePassword === "password") {
            setTypePassword("text");
        } else {
            setTypePassword("password");
        }
    }

    const navigate = useNavigate()
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        register(form, (status: boolean, res: any) => {
            if (status) {
                console.log(res);
                setErrorMsg('')
                navigate('/login')
            } else {
                setErrorMsg('Email telah di gunakan')
                console.log(res);
            }
        })
    }

    return (
        <div className="register">
            <div className="container mx-auto flex justify-center items-center w-[100vw] h-[100vh]">
                <form className='p-6 bg-[#F1FAEE] rounded-lg m-3 lg:m-0' onSubmit={handleSubmit} >

                    <div className="logo flex justify-center my-5">
                        <img className="h-24" src={logo} alt='logo' />
                    </div>
                    <div className="flex gap-3">
                        <InputForm placeholder='Masukkan Nama' type='text' htmlFor={'username'} value={form.username} onChange={handleChange} />
                        <InputForm placeholder='Masukkan Email' type='email' htmlFor={'email'} value={form.email} onChange={handleChange} />
                    </div>

                    <label htmlFor="message" className="block  font-medium " />
                    <textarea id="message" className="block mb-3 text-black p-2.5 w-full text-sm  rounded-lg bg-white
                     outline-none" placeholder="Alamat Lengkap"></textarea>

                    <div className="relative">
                        <button onClick={togglePassword} type='button' className='icon-password h-full  bg-transparent flex absolute right-0 justify-center items-center pe-4' >
                            {showPassword ? <FaEyeSlash size={20} color='#636363' /> : <IoEye size={20} color='#636363' />}
                        </button>
                        <InputForm className='form-input-login' htmlFor="password" onChange={handleChange} type={typePassword} value={form.password} placeholder="Masukkan Kata Sandi" />
                    </div>
                    <p className="text-sm my-3 text-red-600" >{errorMsg}</p>
                    <ButtonPrimary type='submit' bg={`${disabled ? 'bg-slate-400' : 'bg-primaryblue'}`} disabled={disabled} className={`rounded-lg w-full mb-3 font-medium`}>
                        Register
                    </ButtonPrimary>

                    <p className='text-sm  mt-3' >Apakah sudah punya akun? <Link to={'/login'} className='text-primaryblue font-bold' >Login</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default Register