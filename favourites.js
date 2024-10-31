
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoriteList = document.getElementById("favoriteList");
    
 
    favoriteList.innerHTML = "";

    favorites.forEach((country, index) => {
        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = 'flex';
        buttonContainer.style.alignItems = 'center'; 
        
        const button = document.createElement("button");
        button.textContent = country;
        button.className = "country-button"; 
        button.onclick = () => displayCountryInfo(country);

        const removeButton = document.createElement("button");
        removeButton.textContent = "✖"; 
        removeButton.className = "remove-button"; 
        removeButton.onclick = (event) => {
            event.stopPropagation(); 
            removeFavorite(country);
        };

        buttonContainer.appendChild(button);
        buttonContainer.appendChild(removeButton);
        favoriteList.appendChild(buttonContainer);
    });

    if (favorites.length === 0) {
        favoriteList.innerHTML = "<p>No favorite countries added.</p>";
    }
}

function removeFavorite(country) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = favorites.filter(fav => fav !== country);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    displayFavorites(); 
}

document.addEventListener("DOMContentLoaded", displayFavorites);


function displayCountryInfo(country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                const countryData = data[0];
                
                document.getElementById("countryInfo").innerHTML = `
                    <p><strong>${countryData.name.common}</strong> is located in the <strong>${countryData.region}</strong> region, specifically in the <strong>${countryData.subregion || "N/A"}</strong> subregion. 
                    Its capital is <strong>${countryData.capital}</strong>, and it lies on the continent of <strong>${countryData.continents.join(", ")}</strong>.
                    The population of ${countryData.name.common} is approximately <strong>${countryData.population.toLocaleString()}</strong> people.
                    The area of ${countryData.name.common} is <strong>${countryData.area.toLocaleString()}</strong> square kilometers.
                    The official language(s) spoken are: <strong>${Object.values(countryData.languages).join(", ")}</strong>.
                    The time zone(s) for ${countryData.name.common} is/are: <strong>${countryData.timezones.join(", ")}</strong>.
                    You can view ${countryData.name.common} on <a href="${countryData.maps.googleMaps}" target="_blank">Google Maps</a>.</p>
                `;

                const flag = countryData.flags && countryData.flags.png ? countryData.flags.png : '';
                const coatOfArms = countryData.coatOfArms && countryData.coatOfArms.png ? countryData.coatOfArms.png : '';
                
                document.getElementById("flagImage").src = flag;
                document.getElementById("coatOfArmsImage").src = coatOfArms;

                document.getElementById("flagImage").style.display = flag ? 'block' : 'none';
                document.getElementById("coatOfArmsImage").style.display = coatOfArms ? 'block' : 'none';
            } else {
                document.getElementById("countryInfo").innerHTML = `<p>Error: No information found for ${country}.</p>`;
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            document.getElementById("countryInfo").innerHTML = `<p>Error: Could not retrieve data for ${country}. Please try again later.</p>`;
        });
}

function clearFavorites() {
    if (confirm("Are you sure you want to clear all favorites?")) {
        localStorage.removeItem("favorites");
        displayFavorites(); 
    }
}

document.addEventListener("DOMContentLoaded", displayFavorites);
