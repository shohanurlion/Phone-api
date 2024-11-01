const dataLode = async (value='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`);
    const data = await res.json();
    const phone = data.data;
    phoneshow(phone,isShowAll)
    
}
const handleSearch =(isShowAll)=>{
    toggleLoadingSpinner(true);
    const searchvalue = document.getElementById('search-field');
    const value = searchvalue.value;
    dataLode(value, isShowAll)
}
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

dataLode();

const phoneshow = (phone, isShowAll) =>{
    const showAllContainer = document.getElementById('show-all-container')
    if(phone.length > 12 && !isShowAll ){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden')
    }
    if (!isShowAll) {
        phone = phone.slice(0, 12);
    }
    const phonecard = document.getElementById('phone-container');
    phonecard.textContent= '';
phone.forEach(item => {
    const phoneconten = document.createElement('div');
    phoneconten.classList=`card bg-base-100 shadow-xl`;
    phoneconten.innerHTML= `
        <figure class="">
                  <img
                    src="${item.image}"
                    alt="Shoes" />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">${item.phone_name}</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${item.slug}')" class="btn btn-primary">Show Details</button>
            </div>
                </div>
    `;
    phonecard.appendChild(phoneconten)
    
});
    // hide loading spinner
    toggleLoadingSpinner(false);

}
const handleShowAll = () => {
    handleSearch(true);
}

const handleShowDetail = async (id) => {
    // console.log('clicked show details', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone)
    
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" />
        <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
        <p><span>GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
    `

    // show the modal
    show_details_modal.showModal();
}