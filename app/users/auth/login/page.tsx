import { LoginFormUser } from "@/components/loginFormUser";


const LoginUser =()=>{
return(
    <section className="flex flex-col justify-center items-center gap-4 md:flex-row md:pr-8 md:justify-between">
        <LoginFormUser />
        <img src="/img4.jpg" 
        alt="login image"
        className="hidden h-screen md:block md:rounded-tr-3xl md:rounded-br-3xl md:w-[55vw]"
        />
    </section>
)
}
export default LoginUser;