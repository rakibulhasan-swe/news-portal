let fetchData = [];
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
    .then(data => {
        fetchData = data.data;
        showCategoryNews(data.data, name);
    });
}
const showCategoryNews = (news, name) => {
    document.getElementById('items').innerText = news.length;
    document.getElementById('category').innerText = name;

    const container = document.getElementById('news');
    document.getElementById('news').innerHTML = "";
    news.forEach((singleNews) => {
        const div = document.createElement('div');
        div.classList.add('col-md-12');
        div.innerHTML = `
            <div class="card mb-5">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${singleNews.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${singleNews.title}</h5>
                        <span class="badge text-bg-warning">${singleNews.others_info.is_trending ? "Trending" : ""}</span>
                        <p class="card-text pt-2">${singleNews.details.slice(0, 200)}...</p>
                        <button class="mt-4 btn btn-outline-dark rounded-0 px-5">Details</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        container.appendChild(div);
    })
}


// todays pick
const todaysPick = () => {
    const allTodaysPick =  fetchData.filter((news) => news.others_info.is_todays_pick === true);
    const name = document.getElementById('category').innerText;
    showCategoryNews(allTodaysPick, name);
}
// trending
const trending = () => {
    const allTrendingNews =  fetchData.filter((news) => news.others_info.is_trending === true);
    const name = document.getElementById('category').innerText;
    showCategoryNews(allTrendingNews, name);
}