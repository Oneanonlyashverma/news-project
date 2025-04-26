// Variables
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");
const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
let newsDataArr = [];

// API Key and Endpoints
const API_KEY = "pub_29335b586eef0493d6086aa8ed120984db137";
const BASE_URL = "https://newsdata.io/api/1/news?apikey=" + API_KEY + "&country=in&language=en";
const HEADLINES_NEWS = BASE_URL;
const GENERAL_NEWS = BASE_URL;
const BUSINESS_NEWS = BASE_URL + "&category=business";
const SPORTS_NEWS = BASE_URL + "&category=sports";
const ENTERTAINMENT_NEWS = BASE_URL + "&category=entertainment";
const TECHNOLOGY_NEWS = BASE_URL + "&category=technology";
const SEARCH_NEWS = "https://newsdata.io/api/1/news?apikey=" + API_KEY + "&q=";

// On Load
window.onload = function () {
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchNews(HEADLINES_NEWS);
};

// Event Listeners
generalBtn.addEventListener("click", () => updateNews("General News", GENERAL_NEWS));
businessBtn.addEventListener("click", () => updateNews("Business", BUSINESS_NEWS));
sportsBtn.addEventListener("click", () => updateNews("Sports", SPORTS_NEWS));
entertainmentBtn.addEventListener("click", () => updateNews("Entertainment", ENTERTAINMENT_NEWS));
technologyBtn.addEventListener("click", () => updateNews("Technology", TECHNOLOGY_NEWS));

searchBtn.addEventListener("click", () => {
    if (newsQuery.value.trim() !== "") {
        newsType.innerHTML = `<h4>Search: ${newsQuery.value}</h4>`;
        fetchNews(SEARCH_NEWS + encodeURIComponent(newsQuery.value));
    }
});

// Fetch News Function
const fetchNews = async (url) => {
    try {
        const response = await fetch(url);
        newsDataArr = [];

        if (response.ok) {
            const myJson = await response.json();
            newsDataArr = myJson.results || [];
        } else {
            console.error(response.status, response.statusText);
            newsdetails.innerHTML = "<h5>No data found.</h5>";
            return;
        }

        displayNews();
    } catch (error) {
        console.error("Error fetching news:", error);
        newsdetails.innerHTML = "<h5>Error fetching news.</h5>";
    }
};
const homeBtn = document.querySelector(".navbar-brand");

// Event Listener for clicking the logo
homeBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    newsType.innerHTML = "<h4>Headlines</h4>"; // Update section title
    fetchNews(HEADLINES_NEWS); // Fetch and display headlines
});

// Display News Function
function displayNews() {
    newsdetails.innerHTML = "";
    if (newsDataArr.length === 0) {
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    let newsHTML = "";

    // Loop through all articles and create clickable cards
    newsDataArr.forEach((news) => {
        const date = news.pubDate ? news.pubDate.split(" ")[0] : "Unknown";
        const imageUrl =
            news.image_url || "https://via.placeholder.com/150";
        const title = news.title || "No Title";
        const description =
            news.description && news.description.length > 100
                ? `${news.description.substring(0, 100)}...`
                : news.description || "No description available.";

        // Create a clickable card with a button
        newsHTML += `
            <div class="col-sm-12 col-md-6 col-lg-3 my-2">
                <button class="card p-0 border-0 text-start w-100 h-100" onclick="window.open('${news.link}', '_blank')">
                    <img src="${imageUrl}" class="card-img-top" alt="${title}" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                        <p class="text-muted"><small>${date}</small></p>
                    </div>
                </button>
            </div>
        `;
    });

    // Add the generated HTML to the DOM
    newsdetails.innerHTML = newsHTML;
}

// Utility function to update the news section
function updateNews(title, url) {
    newsType.innerHTML = `<h4>${title}</h4>`;
    fetchNews(url);
}
