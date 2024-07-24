import { useState } from "react"
import { logo } from "../../../image"
import InputForm from "../../../components/elemets/input/InputForm"
import ButtonPrimary from "../../../components/elemets/buttonPrimary"
import { Link, useNavigate } from "react-router-dom"
import { FaEyeSlash } from "react-icons/fa6"
import { IoEye } from "react-icons/io5"
import { useAuth } from "../../../hooks/auth/AuthContext"
import { loginService } from "../../../service/auth"
import { Spinner } from "@nextui-org/react"



const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(true)
    const [errorLogin, setErrorLogin] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [typePassword, setTypePassword] = useState("password")
    const [form, setForm] = useState({
        email: '',
        password: '',
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

    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
        if (typePassword === "password") {
            setTypePassword("text");
        } else {
            setTypePassword("password");
        }
    }

    const handleLogin = (e: any) => {
        e.preventDefault()
        localStorage.clear()
        setLoading(true)
        loginService(form, (status: boolean, res: any) => {
            if (status) {
                const role = res.data.role
                console.log(res.data);

                login({ role })

                localStorage.setItem('token', res.data.token)
                localStorage.setItem('role', res.data.role)
                localStorage.setItem('email', res.data.email)

                const loginTime = new Date().getTime();
                localStorage.setItem('loginTime', loginTime.toString());
                if (res.data.role === 'user') {
                    navigate('/dashboard-user')
                    localStorage.setItem('name', res.data.username)
                } else if (res.data.role === 'admin') {
                    navigate('/dashboard-admin')
                    localStorage.setItem('name', 'admin')
                } else if (res.data.role === 'officer') {
                    localStorage.setItem('idOfficer', res.data.id)
                    localStorage.setItem('id', res.data.unitWork.id)
                    navigate('/dashboard-officer')
                }
                setLoading(false)
            } else {
                setErrorLogin('*Email atau password salah')
                setLoading(false)
            }
        })
    }

    return (
        <div className="login">
            <div className="container mx-auto flex justify-center items-center w-[100vw] h-[100vh]">
                <form className='p-6 bg-[#F1FAEE] rounded-lg w-96 m-3 lg:m-0' onSubmit={handleLogin} >

                    <div className="logo flex justify-center my-5">
                        <img className="h-24" src={logo} alt='logo' />
                    </div>

                    <InputForm placeholder='Masukkan Email' type='email' htmlFor={'email'} value={form.email} onChange={handleChange} />
                    <div className="relative">
                        <button onClick={togglePassword} type='button' className='icon-password h-full  bg-transparent flex absolute right-0 justify-center items-center pe-4' >
                            {showPassword ? <FaEyeSlash size={20} color='#636363' /> : <IoEye size={20} color='#636363' />}
                        </button>
                        <InputForm className='form-input-login' htmlFor="password" onChange={handleChange} type={typePassword} value={form.password} placeholder="Masukkan Kata Sandi" />
                    </div>
                    <p className='text-red-500 my-3 text-sm ' >{errorLogin}</p>
                    <ButtonPrimary type='submit' bg={`${disabled ? 'bg-slate-400' : 'bg-primaryblue'} 
                    `} disabled={disabled} className={`rounded-lg w-full mb-3 font-medium`}>
                        <div className="flex justify-center items-center">
                            <Spinner className={`w-5 h-5 mr-3 ${loading ? '' : 'hidden'}`} size="sm" color="white" />
                            Login
                        </div>
                    </ButtonPrimary>

                    <p className='text-sm  mt-3' >Apakah belum punya akun? <Link to={'/register'} className='text-primaryblue font-bold' >Register</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default Login