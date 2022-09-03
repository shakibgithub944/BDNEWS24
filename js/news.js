const loadData = async () => {
  try {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    // console.log(data.data.news_category);
    return data.data.news_category;
  }
  catch {
    console.log('error from main loader function');
  }

};

const setCategory = async () => {
  const AllCategory = await loadData();
  // console.log(AllCategory);
  const categoryList = document.getElementById('cetegory-container');
  AllCategory.forEach(category => {
    // console.log(category);
    const div = document.createElement('div');
    div.innerHTML = `
        <li onclick="displayNews(${category.category_id})" class="mx-5 li-style"><b>${category.category_name}</b></li>
        `;
    categoryList.appendChild(div);

  });
}
setCategory();
// click and category wise result showing
const displayNews = async (category_id) => {
  const spinners = document.getElementById('spinners');
  spinners.classList.remove('d-none');

  const response = await fetch(`https://openapi.programming-hero.com/api/news/category/0${category_id}`);
  const data = await response.json();
  // console.log(data.data.length)
  const newsFoundNumber = document.getElementById('newsFoundNumber');
  newsFoundNumber.innerHTML = `
    <p class="px-3 fs-4">${data.data.length !== 0 ? data.data.length : 'No'} News Found</p>
    `;

  const DefaultnewsContainer = document.getElementById('DefaultnewsContainer');
  DefaultnewsContainer.textContent = '';

  const newsContainer = document.getElementById('news-container');
  newsContainer.textContent = '';

  //news sort function 
  data.data.sort((a, b) => {
    return b.total_view - a.total_view
  });
  // console.log(data.data)

  data.data.forEach(item => {
    // console.log(item);
    const { title, total_view, author, details, thumbnail_url, _id } = item;
    const div = document.createElement('div');
    div.innerHTML = `       
        <div class="card mb-3" style="max-width: 640px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${details.length > 400 ? details.slice(0, 400) + '...' : details}</p>
              <div class="d-flex justify-content-between align-items-center">
                 <div class="d-flex align-items-center">
                     <img  src="${author.img ? author.img : 'N/A'}" style="width:40px; height:40px; border-radius:50%;" alt="">
                       <span class="mx-3 text-secondary"><b>${author.name ? author.name : 'N/A'}</b></span>
                    </div>
                      <div class="text-secondary"><b><i class="bi bi-eye-fill"></i> ${total_view ? total_view : 'N/A'}</b></div>
                     <div class=""><button onclick="detailsInModal('${_id}')" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#showDetailsInModal">Read More...</button></div>
                 </div>
            </div>
          </div>
        </div>                   
      </div>
        `;
    newsContainer.appendChild(div);
    spinners.classList.add('d-none');
  });

};
// Show News Details in modal ... 
const detailsInModal = async (newsId) => {
  // console.log(newsId);
  const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
  const data = await response.json();

  // console.log(data.data[0]);
  const { title, author, image_url, details, total_view } = data.data[0];

  const newsDetailsContainer = document.getElementById('newsDetailsContainer');
  newsDetailsContainer.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="showDetailsInModalLabel">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img class="w-50" src="${image_url}" alt="author img">
          <p>Reporter: <b>${author.name ? author.name : 'N/A'}</b></p>
          <p>Published Date: <b>${author.published_date ? author.published_date : 'N/A'}</b></p>
          <div class="text-secondary mb-3">Total View:  <b><i class="bi bi-eye-fill"></i> ${total_view ? total_view : 'N/A'}</b></div>
          <p>${details}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    `;
};

const loadAllNews = () => {
  const url = 'https://openapi.programming-hero.com/api/news/category/08';
  try {
    fetch(url)
      .then(res => res.json())
      .then(data => displaAllNews(data.data));
  }
  catch (err) {
    console.log(err);
  }
}
const displaAllNews = (allNews) => {
  //news sort function 
  allNews.sort((a, b) => {
    return b.total_view - a.total_view
  });
  // console.log(data.data)

  //  console.log(allNews);
  allNews.forEach(item => {
    // console.log(item)
    const DefaultnewsContainer = document.getElementById('DefaultnewsContainer');
    const { title, total_view, author, details, thumbnail_url, _id } = item;
    const div = document.createElement('div');
    div.innerHTML = `       
        <div class="card mb-3" style="max-width: 640px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${details.length > 400 ? details.slice(0, 400) + '...' : details}</p>
              <div class="d-flex justify-content-between align-items-center">
                 <div class="d-flex align-items-center">
                     <img  src="${author.img ? author.img : 'N/A'}" style="width:40px; height:40px; border-radius:50%;" alt="">
                       <span class="mx-3 text-secondary"><b>${author.name ? author.name : 'N/A'}</b></span>
                    </div>
                      <div class="text-secondary"><b><i class="bi bi-eye-fill"></i> ${total_view ? total_view : 'N/A'}</b></div>
                     <div class=""><button onclick="detailsInModal('${_id}')" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#showDetailsInModal">Read More...</button></div>
                 </div>
            </div>
          </div>
        </div>                   
      </div>
        `;
    DefaultnewsContainer.appendChild(div);

  });
}
loadAllNews();