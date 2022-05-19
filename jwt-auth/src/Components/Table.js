import React from "react";


 const Table = ({data}) => {


    const Data = data.map((item)=>{
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.phone}</td>
                <td>{item.nationality}</td>
            </tr>
   
        )
    })

   

     return(
         <div className="container">
             <table className="table table-striped">
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>Name</th>
                         <th>Age</th>
                         <th>Phone</th>
                         <th>Nationality</th>
                     </tr>
                 </thead>
                 <tbody>
                     {Data}
                 </tbody>
             </table>

         </div>
     )

 }

 export default Table;