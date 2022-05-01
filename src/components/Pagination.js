import React from 'react'
import './app1.css'

function Paginate({postsPerPage,totalPosts,paginate,currenPage}) {
    const pageNumbers=[];
    for(let i=1;i<=Math.ceil(totalPosts/postsPerPage);i++){
        pageNumbers.push(i)
    }

  return (
    <div>
        <ul className="flex flex-row justify-items-center justify-center items-center p-1 m-1">
            <h1 className='m-1'>Pages</h1>
            {
                pageNumbers.map((number)=>{
                    return(
                        <li key={number}  className="p-1 m-1 " >
                            <a href="#" className={`${currenPage === number ? 'pageLink' : ''} page-no-m`} onClick={()=>paginate(number) }>{number}</a>
                            </li>
                    )
                })
            }
        </ul>


    </div>
  )
}

export default Paginate