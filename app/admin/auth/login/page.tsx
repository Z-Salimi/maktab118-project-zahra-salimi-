import { LoginForm } from "@/components/loginForm";

const LoginAdmin =()=>{
return(
    <section className="flex flex-col justify-center items-center gap-4 md:flex-row md:pr-8 md:justify-between">
        <LoginForm />
        <img src="/loginimg.webp" 
        alt="login image"
        className="hidden h-screen md:block md:rounded-tr-3xl md:rounded-br-3xl md:w-[55vw]"
        />
    </section>
)
}
export default LoginAdmin;