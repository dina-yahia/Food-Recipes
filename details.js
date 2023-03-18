export class Details{
    constructor(id){
        this.id=id;
        console.log(this.id);
     
    
        document.querySelector(".closebtn").addEventListener("click",()=>{
        document.querySelector("#homePage").classList.remove("d-none")
        document.querySelector("#gameCards").classList.remove("d-none")
        document.querySelector("#discription").classList.add("d-none")
        })
       
        
        this.getDetails(id);
    }
}