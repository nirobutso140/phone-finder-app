const loadPhone = async (search) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    const data = await res.json()
    const phones = data.data
    console.log(phones);
    showPhone(phones)
}

const showPhone = phones =>{
    const phoneContainer = document.getElementById('phone_container')
    const showMore = document.getElementById('showMore')
    phoneContainer.textContent = ''
   
    if(phones.length > 12){
        showMore.classList.remove('d-none')
    }else{
        showMore.classList.add('d-none')
    }
    phones = phones.slice(0,10)

    phones.forEach(phone =>{
    
        const div = document.createElement('div')
        div.classList = `card text-center p-4`
        div.innerHTML = `

        <img src=${phone.image} class="card-img-top rounded float-start w-25 d-block mx-auto" alt="...">
        <div class="card-body">
          <h5 class="card-title ">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="handleShowDetails('${phone.slug}')" type="button" class="btn btn-primary">Show Details</button>
        </div>

        
        `
        phoneContainer.appendChild(div)
    })
}

//details btn
const handleShowDetails = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    displayShowDetails(phone)
}

//details modal
const phoneDetails = document.getElementById('phone_details_conainer')
const displayShowDetails = (details_info) =>{
    console.log(details_info);
    phoneDetails.innerHTML = `
    
    <img class="phone_details_img" src=${details_info.image} alt="">
    <p class="phn_desc"><span class="details_title">Brand:</span> ${details_info.brand}</p>
    <p class="phn_desc"><span class="details_title">Storage:</span> ${details_info.mainFeatures.storage} </p>
    <p class="phn_desc"><span class="details_title">Display Size:</span> ${details_info.mainFeatures.displaySize}</p>
    <p class="phn_desc"><span class="details_title">Chipset:</span> ${details_info.mainFeatures.chipSet}</p>
    <p class="phn_desc"><span class="details_title">Memory:</span> ${details_info.mainFeatures.memory}</p>
    <p class="phn_desc"><span class="details_title">Slug:</span> ${details_info.slug}</p>
    <p class="phn_desc"><span class="details_title">Release data:</span> ${details_info.releaseDate}</p>
    <p class="phn_desc"><span class="details_title">GPS:</span> ${details_info.others.GPS}</p>
    `
    showDetails.showModal()
}

//search btn
document.getElementById('searchBtn').addEventListener('click', function(){
    const searchPhone = document.getElementById('searchPhn')
    const searchValue = searchPhone.value
    loadPhone(searchValue)
    searchPhone.value = ''
})





