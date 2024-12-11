import { Button } from "./button"

export const FilterSideBar:React.FC = ()=>{
    return(
        <section className="px-20 py-1">
        <div className="flex justify-center items-center gap-6">
            <Button text="گردبند و آویز" className=" border-2 border-white bg-yellow-400" />
            <Button text="انگشتر" className=" border-2 border-white bg-yellow-400" />
            <Button text="ست و نیم ست" className=" border-2 border-white bg-yellow-400" />
            <Button text="دستبند" className=" border-2 border-white bg-yellow-400" />
            <Button text="گوشواره" className=" border-2 border-white bg-yellow-400" />
        </div>
        </section>
    )
}