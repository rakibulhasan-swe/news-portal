const loadCategories = () => {
    const URL = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(URL)
    .then(res => res.json())
    .then(data => showCategories(data.data.news_category));
}
const showCategories = (categories) => {
    const categorriesContainer = document.getElementById('categories-container');
    categories.forEach((category) => {
        const p = document.createElement('p');
        p.innerHTML = `
            <a class="nav-link" href="#" onclick="fetchCategoryNews('${category.category_id}', '${category.category_name}')">${category.category_name}</a>
        `;
        categorriesContainer.appendChild(p);
    })
}

// fetching category wise news
const fetchCategoryNews = (id, name) => {
    const URL = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(URL)
    .then(res => res.json())
    .then(data => showCategoryNews(data.data, name));
}
const showCategoryNews = (news, name) => {
    document.getElementById('items').innerText = news.length;
    document.getElementById('category').innerText = name;

    const container = document.getElementById('news');
    const div = document.createElement('div');
    news.forEach((singleNews) => {
        div.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
            <div class="col-md-4">
                <img src="..." class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
            </div>
        </div>
        `;
    })
}