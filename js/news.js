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
        <a onclick="displayNews(${category.category_id})" class="text-decoration-none text-dark"><b>${category.category_name}</b></a>
        `;
        categoryList.appendChild(div);

    });
}
setCategory();

const displayNews = async (category_id) => {

    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/0${category_id}`);
    const data = await response.json();
    console.log(data.data.length)
    const newsFoundNumber = document.getElementById('newsFoundNumber');
    newsFoundNumber.innerHTML = `
    <p class="px-5">${data.data.length} News Found</p>
    `;
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    data.data.forEach(item => {
        // console.log(item);
        const { title, total_view, author, details, thumbnail_url } = item;
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
                       <span class="mx-3 text-secondary"><b>${author.name?author.name:'N/A'}</b></span>
                    </div>
                     <div class="text-secondary"><b><i class="bi bi-eye-fill"></i> ${total_view ? total_view : 'N/A'}</b></div>
                     <div class=""><button class="btn btn-outline-info">Read More...</button></div>
                 </div>
            </div>
          </div>
        </div>                   
      </div>
        `;
        newsContainer.appendChild(div);
    });

};

