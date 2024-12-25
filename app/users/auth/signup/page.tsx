import { SignupFormUser } from "@/components/signupFormUser";


const SignupUser =()=>{
return(
    <section className="flex flex-col justify-center gap-4 md:flex-row md:pr-8 md:justify-between">
        <SignupFormUser />
        <img src="/img4.jpg" 
        alt="login image"
        className="hidden h-fit md:block md:rounded-tr-3xl md:rounded-br-3xl md:w-[55vw]"
        />
    </section>
)
}
export default SignupUser;