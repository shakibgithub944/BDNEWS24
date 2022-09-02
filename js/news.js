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

    // try{
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/0${category_id}`);

    const data = await response.json();
    // return data;

    // }
    // catch{
    //     console.log('error from clicking category function');
    // }
    console.log(data.data)

};

