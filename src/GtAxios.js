import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import  img1 from './assts/icon.png';


function GtAxios() {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage =6;
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    axios.get('https://api.coinranking.com/v2/coins')
      .then(res => {
        setCoins(res?.data?.data?.coins)
        console.log(res?.data?.data?.coins)
        console.log(coins)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
// Filter the coins based on the search term
const filteredCoins = coins.filter(val => {
  if (searchTerm === "") {
    return true;
  } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
    return true;
  }
  return false;
});
    // Calculate pagination values
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredCoins.slice(firstIndex, lastIndex);
    const npages = Math.ceil(filteredCoins.length / recordsPerPage);
    const numbers = [...Array(npages + 1).keys()].slice(1);

  return (
    
    <div  style={{ backgroundColor: '#9db2bf', height:649}}>
    
      <div className='searchbar' type="search"><h1 className='App' >List of Coins</h1>
      
      <form  className='form'>
        <input style={{width:400}} placeholder="Search for digital coins " 
        onChange={event => {
          setSearchTerm(event.target.value);
          setCurrentPage(1); // Reset the current page when searching
        }}
        type="text" className='input' />
          <button  type="btn" className='button'><img src={img1} className='img' 
          /></button></form> </div>
    
      <div className='container'>
        {
          records.filter((val) => {
            if (searchTerm == ""){
              return val
            }else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
            }
          }).map(coin => <ul key={coin.name}>
           
          <div className='Card'>
            
          <img 
      src={coin.iconUrl}
      />
          <p style={{fontSize:14,marginBottom:12}}><span className='Span'> NAME:</span> <span style={{marginLeft:35}}>{coin.name}</span></p>

            <p style={{fontSize:14,marginTop:-10,marginBottom:12}}><span className='Span'> BtcPRICE:</span > <span style={{marginLeft:17}}>{coin.btcPrice}</span></p>

            <p style={{fontSize:14,marginTop:-10, marginBottom:12}}><span className='Span'>PRICE:</span> <span style={{marginLeft:38}}>{coin.price}</span></p>
  
            <p style={{fontSize:14,marginTop:-10,marginBottom:12}}><span className='Span'>SYMBOL:</span> <span style={{marginLeft:21}}>{coin.symbol}</span></p>
            </div>
          
          </ul>) 
        
        }   
        
       
      </div>
      <div class="fixed-bottom">
      <div className='pagination-container'   >
  <nav  aria-label="Page navigation example"   >
  
  <ul class="pagination justify-content-center"  >
  <li >
   <a href='#' className='page-link' onClick={prePage}>
Previous
</a>
  </li>

  

  {
    numbers.map((n, i) =>(
      <li  className={`page-item  ${currentPage === n ?  'active':  ''}`}key={i}>
        <a href='#' className='page-link' 
        onClick={()=> changeCPage(n)}>{n}</a>
      </li>
      
    ))
  }
  <li className='page-item' >
<a href='#' className='page-link' onClick={nextPage}>
Next
</a>
  </li>
  </ul>
</nav></div>
    </div>
    </div>
  )
  function prePage(){
 if (currentPage !== 1){
  setCurrentPage (currentPage - 1)
 }
  }
 function changeCPage(id){
  setCurrentPage(id)
 }
 function nextPage(){
  if (currentPage !== npages){
    setCurrentPage (currentPage + 1)
   }
 }
}

export default GtAxios;